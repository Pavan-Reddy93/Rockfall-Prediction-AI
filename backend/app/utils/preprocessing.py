import pandas as pd
import numpy as np

def load_data(path: str):
    df = pd.read_csv(path)
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    return df

def preprocess_data(df: pd.DataFrame):
    df = df.dropna()
    return df

def create_sequences(df, window_size=3):
    features = [
        "rainfall",
        "vibration",
        "slope_angle",
        "wind_speed",
        "soil_moisture"
    ]

    X, y = [], []

    for i in range(len(df) - window_size):
        X.append(df[features].iloc[i:i+window_size].values)
        y.append(df["risk"].iloc[i+window_size])

    return np.array(X), np.array(y)
