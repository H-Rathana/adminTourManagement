import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportReportPDF = (
  report,
  period,
  selectedDate
) => {

  const doc = new jsPDF();

  const today = new Date();
  const reportDate = new Date(selectedDate);

let periodDisplay = "";

switch (period) {

  case "day":

    periodDisplay =
      reportDate.toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );

    break;

  case "week": {

    const firstDay =
      new Date(reportDate);

    firstDay.setDate(
      reportDate.getDate() -
      reportDate.getDay()
    );

    const lastDay =
      new Date(firstDay);

    lastDay.setDate(
      firstDay.getDate() + 6
    );

    periodDisplay =
      `${firstDay.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      )} - ${lastDay.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )}`;

    break;
  }

  case "month":

    periodDisplay =
      reportDate.toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      );

    break;

  case "year":

    periodDisplay =
      reportDate.getFullYear();

    break;

  default:

    periodDisplay = period;

}

  const revenue = Number(report?.revenue || 0);

const topTour = report?.topTour;

const topTours = report?.topTours || [];

const stats = report?.bookingStats || {};

const chartData = report?.chartData || [];

const recentTransactions =
  report?.recentTransactions || [];

const periodLabel =
  period.charAt(0).toUpperCase() +
  period.slice(1);

const bookings =
  Number(stats?.bookings || 0);

// const approved =
//   Number(stats?.approved || 0);

const completed =
  Number(stats?.completed || 0);

// const pending =
//   Number(stats?.pending || 0);

const rejected =
  Number(stats?.rejected || 0);

// const revenueNumber =
//   Number(revenue || 0);

const now = new Date();

const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - 7);

// const startOfMonth = new Date(
//   now.getFullYear(),
//   now.getMonth(),
//   1
// );

// const startOfYear = new Date(
//   now.getFullYear(),
//   0,
//   1
// );

const TABLE_STYLE = {

  margin:{
    left:14,
    right:14,
    bottom:22
},

  headStyles:{
    fillColor:[14,165,233],
    textColor:255,
    fontStyle:"bold",
    halign:"center"
  },

  bodyStyles:{
    fontSize:10,
    valign:"middle"
  },

  alternateRowStyles:{
    fillColor:[248,250,252]
  },

  styles:{
    cellPadding:4
  }
  

};

const addSectionTitle = (

title,

y

)=>{

doc.setFontSize(16);

doc.setTextColor(...COLORS.secondary);

doc.text(

title,

14,

y

);

doc.setDrawColor(...COLORS.primary);

};

const money = (value)=>

`$${Number(value).toLocaleString(
"en-US",
{
minimumFractionDigits:2
}
)}`;

const filteredTransactions =
  recentTransactions;
  // =====================
  // HEADER
  // =====================

  doc.setFontSize(24);

doc.setTextColor(14,165,233);

doc.text("WanderEscape",14,20);

doc.setFontSize(13);

doc.setTextColor(51,65,85);

doc.text(
"TOURISM MANAGEMENT SYSTEM",
14,
31
);

doc.setFontSize(11);

doc.setTextColor(120);

doc.text(
"Business Performance Report",
14,
38
);

doc.setDrawColor(14,165,233);

doc.setLineWidth(0.8);

doc.line(
  14,
  42,
  195,
  42
);

  // =====================
  // DATE & PERIOD
  // =====================

  doc.setFontSize(10);

doc.setTextColor(71,85,105);

doc.text(
  `Generated Date : ${today.toLocaleDateString()}`,
  14,
  52
);

doc.text(
  `Generated Time : ${today.toLocaleTimeString()}`,
  14,
  58
);

doc.text(
  `Report Period : ${periodDisplay}`,
  14,
  64
);

doc.setFontSize(10);

doc.setTextColor(220,38,38);

doc.text(
  "CONFIDENTIAL",
  195,
  18,
  {
    align:"right"
  }
);


doc.setFontSize(18);
const COLORS = {

primary: [14,165,233],

secondary: [30,41,59],

gray: [100,116,139],

success: [22,163,74],

warning: [245,158,11],

danger: [220,38,38]

};

const completionRate =
  bookings > 0
    ? ((completed / bookings) * 100).toFixed(1)
    : 0;

const rejectionRate =
  bookings > 0
    ? ((rejected / bookings) * 100).toFixed(1)
    : 0;

const averageBookingValue =
  bookings > 0
    ? (revenue / bookings).toFixed(2)
    : 0;

doc.setFontSize(16);

doc.setTextColor(
  30,
  41,
  59
);

addSectionTitle(
  "Business Performance Summary",
  72
);

autoTable(doc,{

  ...TABLE_STYLE,

  startY:78,
headStyles:{
    fillColor:[14,165,233]
},
head: [
  ["Operational KPI", "Result"]
],

body: [

[
"Report Period",
periodLabel
],

[
"Total Booking Requests",
bookings
],

[
"Revenue Generated",
money(revenue)
],

[
"Average Booking Value",
`$${averageBookingValue}`
],

[
"Completion Rate",
`${completionRate}%`
],

[
"Rejection Rate",
`${rejectionRate}%`
],

[
"Most Popular Tour",
topTour?.title || "N/A"
],

// [
// "Customer Review Score",
// topTour?.bookings || 0
// ]

]

});

  // =====================
  // TOP TOURS
  // =====================

  addSectionTitle(
    "Featured Tour",
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
    ...TABLE_STYLE,
    body: [

          [
            periodLabel,
            topTour?.title || "N/A",
            topTour?.bookings || 0
          ]

          ],
    headStyles:{
    fillColor:[249,115,22]
},
  });

  // =====================
  // REVENUE ANALYTICS
  // =====================

  addSectionTitle(
    "Revenue Analytics",
    doc.lastAutoTable.finalY + 15
    
);

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 20,
    
    head: [[
      "Period",
      "Revenue"
    ]],
    ...TABLE_STYLE,
    body: [

        [
          periodLabel,
          money(revenue)
        ]

        ],
        headStyles:{
    fillColor:[22,163,74]
},

  });

  // =====================
  // MONTHLY BOOKINGS
  // =====================
if (period !== "week") {
  const monthlyData =
    chartData?.map(
      (item) => [

        item.label,

        item.bookings

      ]
    ) || [];

  const totalMonthlyBookings =
    chartData?.reduce(
      (sum, item) =>
        sum + Number(item.bookings),
      0
    );

  monthlyData.push([
    "TOTAL",
    totalMonthlyBookings
  ]);

const chartTitle =
  period === "day"
    ? "Daily Booking Trend"
    : period === "week"
    ? "Weekly Booking Trend"
    : period === "month"
    ? "Monthly Booking Trend"
    : "Yearly Booking Trend";

addSectionTitle(
    chartTitle,
    doc.lastAutoTable.finalY + 15
);

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 20,
   head: [[
  period === "day"
    ? "Hour"
    : period === "week"
    ? "Day"
    : period === "month"
    ? "Day"
    : "Month",

  "Bookings"
]],
    ...TABLE_STYLE,
    body: monthlyData,
    headStyles:{
    fillColor:[139,92,246]
},
  });
}


  addSectionTitle(
    "Top 5 Most Booked Tours",
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
    ...TABLE_STYLE,
    headStyles:{
    fillColor:[79,70,229]
},
    body:
      topTours?.map(
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

  addSectionTitle(
    "Recent Transactions",
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
    ...TABLE_STYLE,
     headStyles:{
    fillColor:[71,85,105]
},
    body:
filteredTransactions.map(item => [

  `#${item.booking_id}`,

  item.full_name,

  `$${item.amount}`,

  item.payment_status,

  new Date(
    item.payment_date
  ).toLocaleDateString()

])

  });

// =====================
// FOOTER
// =====================

const pageCount = doc.getNumberOfPages();

for (let i = 1; i <= pageCount; i++) {

  doc.setPage(i);

  const pageHeight =
    doc.internal.pageSize.height;

  const pageWidth =
    doc.internal.pageSize.width;

  // line above footer
  doc.setDrawColor(220);

  doc.line(
    14,
    pageHeight - 18,
    pageWidth - 14,
    pageHeight - 18
  );

  // footer text
  doc.setFontSize(9);

  doc.setTextColor(120);

  doc.text(
    "Generated by WanderEscape",
    14,
    pageHeight - 10
  );

  doc.text(
    `Generated: ${today.toLocaleDateString()}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  doc.text(
    `Page ${i} of ${pageCount}`,
    pageWidth - 14,
    pageHeight - 10,
    { align: "right" }
  );

}

  // =====================
  // SAVE
  // =====================

  doc.save(

`WanderEscape_${periodLabel.replace(
 /\s/g,
 "_"
)}_${today
  .toISOString()
  .slice(0,10)}.pdf`

);

};