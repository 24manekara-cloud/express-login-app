import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

# Sample training data
data = {
    "category_match": [1, 1, 0, 1, 0, 1, 0, 1],
    "brand_match":    [1, 0, 0, 1, 0, 0, 1, 1],
    "price_fit":      [1, 1, 1, 0, 1, 0, 1, 1],
    "rating":         [4.5, 4.2, 4.0, 4.8, 3.9, 4.1, 4.3, 4.7],
    "popularity":     [90, 85, 70, 95, 60, 75, 80, 92],
    "score":          [95, 80, 50, 88, 45, 70, 76, 97]
}

df = pd.DataFrame(data)

X = df[["category_match", "brand_match", "price_fit", "rating", "popularity"]]
y = df["score"]

model = LinearRegression()
model.fit(X, y)

with open("recommendation_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved as recommendation_model.pkl")
print("Coefficients:", model.coef_)
print("Intercept:", model.intercept_)