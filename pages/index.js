import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [tenureType, setTenureType] = useState('months');
  const [prepayment, setPrepayment] = useState('');
  const [results, setResults] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = tenureType === 'years' ? parseFloat(loanTenure) * 12 : parseFloat(loanTenure);
    const EMI = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalAmount = EMI * n;
    const totalInterest = totalAmount - P;

    const monthlyBreakdown = [];
    let remainingBalance = P;
    for (let i = 1; i <= n; i++) {
      const interestPaid = remainingBalance * r;
      const principalPaid = EMI - interestPaid;
      remainingBalance -= principalPaid;
      monthlyBreakdown.push({
        month: i,
        emiPaid: EMI.toFixed(2),
        interestPaid: interestPaid.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        remainingBalance: remainingBalance > 0 ? remainingBalance.toFixed(2) : 0,
      });
    }

    setResults({
      emi: EMI.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      monthlyBreakdown,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
        <Calculator className="mr-2" /> EMI Calculator
      </h1>
      <form onSubmit={calculateEMI} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanAmount">
              Loan Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              id="loanAmount"
              type="number"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interestRate">
              Interest Rate (% per annum)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              id="interestRate"
              type="number"
              step="0.01"
              placeholder="Enter interest rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanTenure">
              Loan Tenure
            </label>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                id="loanTenure"
                type="number"
                placeholder="Enter loan tenure"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                required
              />
              <select
                className="shadow border rounded-r bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value)}
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prepayment">
              Prepayment (Optional)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              id="prepayment"
              type="number"
              placeholder="Enter prepayment amount"
              value={prepayment}
              onChange={(e) => setPrepayment(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Calculate EMI
          </button>
        </div>
      </form>
      {results && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">EMI Calculation Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2 text-gray-700">Monthly EMI</h3>
              <p className="text-2xl text-blue-600">₹{results.emi}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2 text-gray-700">Total Interest Payable</h3>
              <p className="text-2xl text-blue-600">₹{results.totalInterest}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2 text-gray-700">Total Amount Payable</h3>
              <p className="text-2xl text-blue-600">₹{results.totalAmount}</p>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Month-wise Breakdown</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <div className="grid grid-cols-5 bg-gray-200 p-2 font-bold text-gray-700">
                  <div>Month</div>
                  <div>EMI Paid</div>
                  <div>Interest Paid</div>
                  <div>Principal Paid</div>
                  <div>Remaining Balance</div>
                </div>
                {results.monthlyBreakdown.map((item) => (
                  <div key={item.month} className="grid grid-cols-5 border-b p-2 text-gray-600">
                    <div>{item.month}</div>
                    <div>₹{item.emiPaid}</div>
                    <div>₹{item.interestPaid}</div>
                    <div>₹{item.principalPaid}</div>
                    <div>₹{item.remainingBalance}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;