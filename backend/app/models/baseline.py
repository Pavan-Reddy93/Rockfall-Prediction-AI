import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

from app.utils.preprocessing import load_data, preprocess_data


def train_baseline_model():
    # Load dataset
    df = load_data("data/raw/rockfall_data.csv")
    df = preprocess_data(df)

    # Features and target
    X = df[[
        "rainfall",
        "vibration",
        "slope_angle",
        "wind_speed",
        "soil_moisture"
    ]]
    y = df["risk"]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Train model
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
    model.fit(X_train, y_train)

    # Predictions
    y_pred = model.predict(X_test)

    # Metrics
    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred, zero_division=0),
        "recall": recall_score(y_test, y_pred, zero_division=0),
        "f1_score": f1_score(y_test, y_pred, zero_division=0)
    }

    return metrics
