from app.models.baseline import train_baseline_model

if __name__ == "__main__":
    metrics = train_baseline_model()
    print("Baseline Model Metrics:")
    for key, value in metrics.items():
        print(f"{key}: {value:.4f}")
