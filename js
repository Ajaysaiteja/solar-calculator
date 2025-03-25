function calculateSolar() {
    const type = $w("#dropdown1").value;
    const monthlyBillStr = $w("#input1").value;
    const avgUnitsStr = $w("#input2").value;
    const rooftopAreaStr = $w("#input3").value;

    // Hide result boxes before each calculation
    $w("#box1").hide();
    $w("#box2").hide();
    $w("#box3").hide();

    // Validate input presence and numeric
    if (!type || !monthlyBillStr || !avgUnitsStr || !rooftopAreaStr) return;

    const monthlyBill = parseFloat(monthlyBillStr);
    const avgUnits = parseFloat(avgUnitsStr);
    const rooftopArea = parseFloat(rooftopAreaStr);

    if (isNaN(monthlyBill) || isNaN(avgUnits) || isNaN(rooftopArea)) return;

    // Calculations
    const requiredKW = avgUnits / 100;
    const areaRequired = requiredKW * 100;
    const savingsRatePerKW = type.toLowerCase() === "commercial" ? 1200 : 1000;
    const estimatedMonthlySavings = requiredKW * savingsRatePerKW;
    const estimatedAnnualSavings = estimatedMonthlySavings * 12;

    // Function to capitalize each word
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

    // Box 1: System Info
    $w("#text162").text = toTitleCase(type);
$w("#text167").text = `${requiredKW.toFixed(2)} kW`;
$w("#box1").show();


    // Box 2: Rooftop Info

$w("#text163").text = `${rooftopArea.toFixed(0)} sq.ft`;
$w("#text169").text = `${areaRequired.toFixed(0)} sq.ft`;

if (rooftopArea >= areaRequired) {
    $w("#text171").text = "✅ Rooftop area is sufficient.";
} else {
    const shortage = areaRequired - rooftopArea;
    $w("#text171").text = `❌ Not sufficient. Short by: ${shortage.toFixed(0)} sq.ft`;
}
$w("#box2").show();

    // Box 3: Savings Info

$w("#text164").text = `${estimatedMonthlySavings.toFixed(0)}`;
$w("#text174").text = `${estimatedAnnualSavings.toFixed(0)}`;
$w("#box3").show();

}

$w.onReady(function () {
    // Hide result boxes on page load
    $w("#box1").hide();
    $w("#box2").hide();
   $w("#box3").hide();



    // Trigger calculation on input changes
    $w("#input1").onInput(() => calculateSolar());
    $w("#input2").onInput(() => calculateSolar());
    $w("#input3").onInput(() => calculateSolar());
    $w("#dropdown1").onChange(() => calculateSolar());

    // Trigger calculation on submit button click
    //$w("#button9").onClick(() => calculateSolar());

});
