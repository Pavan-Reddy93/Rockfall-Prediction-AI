import torch
import torch.nn as nn
import numpy as np
from app.utils.preprocessing import load_data, preprocess_data, create_sequences


class SimpleTFT(nn.Module):
    def __init__(self, input_size, hidden_size):
        super(SimpleTFT, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.attention = nn.Linear(hidden_size, 1)
        self.fc = nn.Linear(hidden_size, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        attn_weights = torch.softmax(self.attention(lstm_out), dim=1)
        context = torch.sum(attn_weights * lstm_out, dim=1)
        out = self.fc(context)
        return self.sigmoid(out)


def train_tft_model():
    df = load_data("data/raw/rockfall_data.csv")
    df = preprocess_data(df)

    X, y = create_sequences(df, window_size=3)

    X = torch.tensor(X, dtype=torch.float32)
    y = torch.tensor(y, dtype=torch.float32).unsqueeze(1)

    model = SimpleTFT(input_size=5, hidden_size=16)
    criterion = nn.BCELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    for epoch in range(50):
        optimizer.zero_grad()
        outputs = model(X)
        loss = criterion(outputs, y)
        loss.backward()
        optimizer.step()

    return model


def predict_risk(input_data: dict):
    # Temporary inference logic
    risk_score = 0.85

    return {
        "risk_level": "HIGH" if risk_score > 0.7 else "LOW",
        "confidence": risk_score,
        "lead_time": 6
    }
