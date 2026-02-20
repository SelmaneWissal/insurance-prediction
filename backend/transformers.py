# transformers.py
from sklearn.base import BaseEstimator, TransformerMixin

class AddFeaturesTransformer(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X_transformed = X.copy()
        X_transformed["smoker_bmi"] = X_transformed["bmi"] * X_transformed["smoker"].map({"yes": 1, "no": 0})
        X_transformed["age_smoker"] = X_transformed["age"] * X_transformed["smoker"].map({"yes": 1, "no": 0})
        return X_transformed

    def get_feature_names_out(self, input_features=None):
        if input_features is None:
           return ["smoker_bmi", "age_smoker"]
        return list(input_features) + ["smoker_bmi", "age_smoker"]