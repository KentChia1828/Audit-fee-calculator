document.getElementById('turnover').addEventListener('input', calculateFees);
document.getElementById('totalAssets').addEventListener('input', calculateFees);
document.getElementById('operatingExpenses').addEventListener('input', calculateFees);

function calculateFees() {
    const turnover = parseFloat(document.getElementById('turnover').value);
    const totalAssets = parseFloat(document.getElementById('totalAssets').value);
    const operatingExpenses = parseFloat(document.getElementById('operatingExpenses').value);

    if (isNaN(turnover) || isNaN(totalAssets) || isNaN(operatingExpenses)) {
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">Please enter valid numbers in all fields.</div>';
        return;
    }

    const grossFeeTurnover = calculateGrossFee(turnover);
    const grossFeeAssets = calculateGrossFee(totalAssets);
    const operatingFee = calculateOperatingFee(operatingExpenses);

    const revisedGrossFeeTurnover = grossFeeTurnover * 1.13;
    const revisedGrossFeeAssets = grossFeeAssets * 1.13;
    const revisedOperatingFee = operatingFee * 1.13;

    const maxOriginalFee = Math.max(grossFeeTurnover, grossFeeAssets, operatingFee);
    const minOriginalFee = Math.min(grossFeeTurnover, grossFeeAssets, operatingFee);
    const averageOriginalFee = (maxOriginalFee + minOriginalFee) / 2;
    const roundedOriginalFee = Math.round(averageOriginalFee / 100) * 100;

    const maxRevisedFee = Math.max(revisedGrossFeeTurnover, revisedGrossFeeAssets, revisedOperatingFee);
    const minRevisedFee = Math.min(revisedGrossFeeTurnover, revisedGrossFeeAssets, revisedOperatingFee);
    const averageRevisedFee = (maxRevisedFee + minRevisedFee) / 2;
    const roundedRevisedFee = Math.round(averageRevisedFee / 100) * 100;

    const result = `
        <table class="fee-table">
            <tr>
                <th>Audit Fee Basis</th>
                <th>Before Revised (RM)</th>
                <th>After Revised (RM)</th>
            </tr>
            <tr>
                <td>Gross Turnover</td>
                <td>${grossFeeTurnover.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>${revisedGrossFeeTurnover.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
            <tr>
                <td>Total Assets</td>
                <td>${grossFeeAssets.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>${revisedGrossFeeAssets.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
            <tr>
                <td>Total Operating Expenditure</td>
                <td>${operatingFee.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>${revisedOperatingFee.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
            <tr class="highlighted">
                <td><strong>Recommended Audit Fee (Original)</strong></td>
                <td colspan="2"><strong>RM ${roundedOriginalFee.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
            </tr>
            <tr class="highlighted">
                <td><strong>Recommended Audit Fee (Revised)</strong></td>
                <td colspan="2"><strong>RM ${roundedRevisedFee.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></td>
            </tr>
        </table>
        <button onclick="window.print()" class="btn-print">Print Results</button>
    `;

    document.getElementById('result').innerHTML = result;
}

function calculateGrossFee(value) {
    if (value <= 100000) {
        return 1000;
    } else if (value <= 250000) {
        return 1000 + (value - 100000) * 0.00438;
    } else if (value <= 500000) {
        return 1657 + (value - 250000) * 0.00313;
    } else if (value <= 1000000) {
        return 2440 + (value - 500000) * 0.00188;
    } else if (value <= 2500000) {
        return 3380 + (value - 1000000) * 0.00125;
    } else if (value <= 5000000) {
        return 5255 + (value - 2500000) * 0.001;
    } else if (value <= 10000000) {
        return 7755 + (value - 5000000) * 0.00094;
    } else if (value <= 20000000) {
        return 12455 + (value - 10000000) * 0.001;
    } else {
        return 22455 + (value - 20000000) * 0.001;
    }
}

function calculateOperatingFee(value) {
    if (value <= 50000) {
        return 1250;
    } else if (value <= 200000) {
        return 1250 + (value - 50000) * 0.0125;
    } else if (value <= 1000000) {
        return 3125 + (value - 200000) * 0.00625;
    } else if (value <= 2000000) {
        return 8125 + (value - 1000000) * 0.0025;
    } else {
        return 10625 + (value - 2000000) * 0.0025;
    }
}
