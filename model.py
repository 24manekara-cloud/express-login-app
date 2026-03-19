import json
import sys
import pandas as pd
import pickle

# ----------------------------
# 1. Load trained model
# ----------------------------
with open("recommendation_model.pkl", "rb") as f:
    model = pickle.load(f)

# ----------------------------
# 2. Load products dataset
# ----------------------------
products = pd.read_csv("products.csv")
products.columns = products.columns.str.strip().str.lower()

# ----------------------------
# 3. Rename dataset columns to match model logic
# ----------------------------
column_mapping = {
    "product_id": "id",
    "product_name": "name",
    "main_category": "category",
    "price_inr": "price",
    "popularity_score": "popularity"
}

products = products.rename(columns=column_mapping)

# ----------------------------
# 4. Check required columns
# ----------------------------
required_cols = ["id", "name", "category", "brand", "price", "rating", "popularity"]
missing_cols = [col for col in required_cols if col not in products.columns]

if missing_cols:
    raise ValueError(
        f"Missing required columns: {missing_cols}. Available columns: {list(products.columns)}"
    )

# ----------------------------
# 5. Read user input
# ----------------------------
user_data = json.loads(sys.argv[1])

preferred_categories = [c.lower() for c in user_data.get("preferred_categories", [])]
preferred_brands = [b.lower() for b in user_data.get("preferred_brands", [])]
budget = user_data.get("budget", 999999)
viewed_products = user_data.get("viewed_products", [])
purchased_products = user_data.get("purchased_products", [])

exclude_ids = set(viewed_products + purchased_products)

# ----------------------------
# 6. Remove already viewed / purchased products
# ----------------------------
filtered_products = products[~products["id"].isin(exclude_ids)].copy()

# ----------------------------
# 7. Create features for prediction
# ----------------------------
def create_features(product):
    category_match = 1 if str(product["category"]).lower() in preferred_categories else 0
    brand_match = 1 if str(product["brand"]).lower() in preferred_brands else 0
    price_fit = 1 if product["price"] <= budget else 0

    return pd.Series({
        "category_match": category_match,
        "brand_match": brand_match,
        "price_fit": price_fit,
        "rating": product["rating"],
        "popularity": product["popularity"]
    })

features = filtered_products.apply(create_features, axis=1)

# ----------------------------
# 8. Predict score
# ----------------------------
filtered_products["predicted_score"] = model.predict(features)

# ----------------------------
# 9. Sort and select top recommendations
# ----------------------------
recommended = filtered_products.sort_values(by="predicted_score", ascending=False).head(25)

# ----------------------------
# 10. Return result
# ----------------------------
result = recommended[
    ["id", "name", "category", "brand", "price", "rating", "popularity", "predicted_score"]
].to_dict(orient="records")

print(json.dumps(result, indent=2))