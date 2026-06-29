import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportReportPDF = (report) => {

  const doc = new jsPDF();

  const today = new Date();

  // =====================
  // HEADER
  // =====================

  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59);

  doc.text(
    "WanderEscape",
    14,
    20
  );

  doc.setFontSize(14);

  doc.text(
    "Tourism Management Report",
    14,
    30
  );

  doc.line(
    14,
    35,
    195,
    35
  );

  // =====================
  // DATE & PERIOD
  // =====================

  doc.setFontSize(11);

  doc.text(
    `Generated Date: ${today.toLocaleDateString()}`,
    14,
    45
  );

  doc.text(
    `Generated Time: ${today.toLocaleTimeString()}`,
    14,
    52
  );

  doc.text(
    `Report Period: January 2026 - ${today.toLocaleDateString()}`,
    14,
    59
  );

  // =====================
  // EXECUTIVE SUMMARY
  // =====================

  const executiveSummary = `
During the reporting period, the WanderEscape Tourism Management System recorded
${report.totalBookings} bookings and generated total revenue of $${report.totalRevenue}.

The highest-performing tour this year was
${report.topTourYear?.title || "N/A"}
with ${report.topTourYear?.bookings || 0} bookings.

Monthly revenue reached $${report.revenueMonth},
while yearly revenue currently stands at $${report.revenueYear}.

The system successfully completed
${report.completed || 0} bookings,
while ${report.rejected || 0}
bookings were rejected.
`;


// EXECUTIVE SUMMARY


doc.setFontSize(16);

doc.text(
  "Executive Summary",
  14,
  75
);

doc.setFontSize(11);

doc.setTextColor(
  80,
  80,
  80
);

const summaryLines =
  doc.splitTextToSize(
    executiveSummary,
    180
  );

doc.text(
  summaryLines,
  14,
  85
);


const summaryEndY =
  85 +
  (summaryLines.length * 6);

  // =====================
  // REPORT SUMMARY
  // =====================

doc.setFontSize(16);

doc.setTextColor(
  30,
  41,
  59
);

doc.text(
  "Report Summary",
  14,
  summaryEndY + 10
);

autoTable(doc, {

  startY:
    summaryEndY + 15,

  head: [
    ["Metric", "Value"]
  ],

  body: [
    [
      "Total Revenue",
      `$${report.totalRevenue}`
    ],
    [
      "Total Bookings",
      report.totalBookings
    ],
    [
      "Approved",
      report.approved
    ],
    [
      "Completed",
      report.completed
    ],
    [
      "Pending",
      report.pending
    ],
    [
      "Rejected",
      report.rejected
    ]
  ]

});

  // =====================
  // TOP TOURS
  // =====================

  doc.setFontSize(16);

  doc.text(
    "Top Performing Tours",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 20,

    head: [[
      "Period",
      "Tour Name",
      "Bookings"
    ]],

    body: [

      [
        "This Week",
        report.topTourWeek?.title || "N/A",
        report.topTourWeek?.bookings || 0
      ],

      [
        "This Month",
        report.topTourMonth?.title || "N/A",
        report.topTourMonth?.bookings || 0
      ],

      [
        "This Year",
        report.topTourYear?.title || "N/A",
        report.topTourYear?.bookings || 0
      ],

    ],

  });

  // =====================
  // REVENUE ANALYTICS
  // =====================

  doc.setFontSize(16);

  doc.text(
    "Revenue Analytics",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 20,

    head: [[
      "Period",
      "Revenue"
    ]],

    body: [

      [
        "This Week",
        `$${report.revenueWeek}`
      ],

      [
        "This Month",
        `$${report.revenueMonth}`
      ],

      [
        "This Year",
        `$${report.revenueYear}`
      ],

    ],

  });

  // =====================
  // MONTHLY BOOKINGS
  // =====================

  const monthlyData =
    report.monthlyBookings?.map(
      (item) => [

        item.month,

        item.bookings

      ]
    ) || [];

  const totalMonthlyBookings =
    report.monthlyBookings?.reduce(
      (sum, item) =>
        sum + Number(item.bookings),
      0
    );

  monthlyData.push([
    "TOTAL",
    totalMonthlyBookings
  ]);

  doc.setFontSize(16);

  doc.text(
    "Monthly Booking Trend",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 20,

    head: [[
      "Month",
      "Bookings"
    ]],

    body: monthlyData,

  });

  // =====================
  // TOP 5 TOURS
  // =====================

  doc.setFontSize(16);

  doc.text(
    "Top 5 Most Booked Tours",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 20,

    head: [[
      "Rank",
      "Tour",
      "Bookings"
    ]],

    body:
      report.topTours?.map(
        (tour, index) => [

          index + 1,

          tour.title,

          tour.bookings

        ]
      ) || [],

  });

  // =====================
  // RECENT TRANSACTIONS
  // =====================

  doc.setFontSize(16);

  doc.text(
    "Recent Transactions",
    14,
    doc.lastAutoTable.finalY + 15
  );

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 20,

    head: [[
      "REF",
      "Customer",
      "Amount",
      "Status",
      "Date"
    ]],

    body:
      report.recentTransactions?.map(
        (item) => [

          `#${item.booking_id}`,

          item.full_name,

          `$${item.amount}`,

          item.payment_status,

          new Date(
            item.payment_date
          ).toLocaleDateString()

        ]
      ) || [],

  });

  // =====================
  // FOOTER
  // =====================

  const pageHeight =
    doc.internal.pageSize.height;

  doc.setFontSize(10);

  doc.setTextColor(
    120,
    120,
    120
  );

  doc.text(
    "Generated by WanderEscape Tourism Management System",
    14,
    pageHeight - 10
  );

  // =====================
  // SAVE
  // =====================

  doc.save(
    `WanderEscape_Report_${today
      .toISOString()
      .slice(0, 10)}.pdf`
  );

};