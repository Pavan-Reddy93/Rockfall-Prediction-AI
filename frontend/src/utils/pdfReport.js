import jsPDF from "jspdf";
export function generateGovtPDF({ risk, location, weather }) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  const confidencePct =
    typeof risk?.confidence === "number"
      ? (risk.confidence * 100).toFixed(1)
      : "N/A";

  doc.setDrawColor(180, 0, 0);
  doc.setLineWidth(1);
  doc.rect(10, 10, pageWidth - 20, 277); 


  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(180, 0, 0);
  doc.text("AI-BASED ROCKFALL PREDICTION SYSTEM", 105, y + 10, { align: "center" });
  
  y += 18;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Official Forensic Risk Assessment Report", 105, y, { align: "center" });

  y += 15;


  doc.setDrawColor(200);
  doc.setLineWidth(0.2);
  doc.setFillColor(245, 245, 245);
  doc.rect(20, y, 170, 30, "F"); 
  
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.text([
    `Institution: Presidency University, Bengaluru`,
    `Project: AI-Based Rockfall Prediction and Alert System for Open-Pit Mines`,
    `Developed By: Kasara Pavan Sai Reddy & Likhitha Bhavana Chitturi`,
    `Report Generated On: ${new Date().toLocaleString()}`
  ], 25, y + 7);

  y += 40;

 
  const section = (title) => {
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 102); // Navy Blue
    doc.text(title.toUpperCase(), 20, y);
    y += 2;
    doc.line(20, y, 190, y);
    y += 7;
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
  };

 
  section("1. Introduction");
  const intro = "Rockfall hazards in open-pit mining pose significant risks to human life, equipment, and operational continuity. This AI-based system provides early warning by analyzing environmental and geotechnical parameters using data-driven intelligence.";
  doc.text(doc.splitTextToSize(intro, 170), 20, y);
  y += 20;

  
  section("2. Current Risk Assessment");
  const riskLevel = (risk?.risk_level || "UNKNOWN").toUpperCase();
  
 
  if (riskLevel === "HIGH") doc.setFillColor(255, 230, 230), doc.setDrawColor(180, 0, 0);
  else if (riskLevel === "MEDIUM") doc.setFillColor(255, 250, 204), doc.setDrawColor(204, 153, 0);
  else doc.setFillColor(230, 255, 230), doc.setDrawColor(0, 128, 0);

  doc.rect(20, y, 170, 25, "FD");
  doc.setFont("times", "bold");
  doc.text(`PREDICTED RISK LEVEL: ${riskLevel}`, 105, y + 10, { align: "center" });
  doc.setFont("times", "normal");
  doc.text(`Confidence: ${confidencePct}% | Est. Lead Time: ${risk?.lead_time_hours || "N/A"} Hours`, 105, y + 18, { align: "center" });
  
  y += 35;

  
  section("3. Input Parameters Considered");
  const params = ["• Rainfall (mm)", "• Slope Angle (degrees)", "• Ground Vibration", "• Wind Speed", "• Soil Moisture"];
  doc.text(params, 25, y);
  y += 35;

  section("4. Forensic Risk Explanation");
  const explanationText = doc.splitTextToSize(risk?.explanation || "No forensic data available for the current cycle.", 170);
  doc.text(explanationText, 20, y);
  
 
  doc.addPage();
  y = 30;

  
  section("5. Environment Snapshot");
  doc.text([
    `Latitude:  ${location?.lat || "N/A"}`,
    `Longitude: ${location?.lng || "N/A"}`,
    `Rainfall:  ${weather?.rainfall || 0} mm`,
    `Wind:      ${weather?.wind_speed || 0} m/s`,
    `Humidity:  ${weather?.humidity || 0}%`
  ], 20, y);
  y += 40;

 
  section("6. Required Action Plan");
  const recs = [
    "• Immediate: Issue precautionary alerts to all on-site personnel.",
    "• Operational: Restrict heavy machinery movement in high-risk zones.",
    "• Technical: Deploy or calibrate local slope monitoring sensors.",
    "• Safety: Increase manual inspection frequency immediately."
  ];
  doc.text(recs, 20, y);
  y += 40;

 
 section("7. AI & Risk Assessment Methodology");
  
 
  const baseMethodology = "The system integrates rule-based thresholds inspired by internationally accepted slope-stability principles, combined with AI-assisted risk inference. Risk levels are classified as LOW, MEDIUM, or HIGH based on confidence scores and temporal failure patterns[cite: 34].";
  
 
  const newAlignmentText = "The proposed system aligns with established landslide and rockfall risk thresholds used in geotechnical and disaster-management studies. Instead of relying on single-parameter cut-offs, the model integrates rainfall, slope geometry, vibration, soil moisture, and wind speed using a weighted risk scoring approach, enabling realistic multi-factor early warning.";

  const combinedMethodology = doc.splitTextToSize(`${baseMethodology} \n\n${newAlignmentText}`, 170);
  doc.text(combinedMethodology, 20, y);
  
  y += (combinedMethodology.length * 5) + 10;

  
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`© 2026 Rockfall-AI System | Presidency University | Page ${i} of ${pageCount}`, 105, 285, { align: "center" });
  }

 
  doc.save(`Rockfall_Report_${riskLevel}_${new Date().getTime()}.pdf`);
}