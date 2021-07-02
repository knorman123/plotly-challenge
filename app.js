// Create function to initialize page
function init() {
   var dropDown = d3.select("#selDataset");
   // get info from json
   d3.json("samples.json").then(data => {
      var names = data.names;
      names.forEach(name => dropDown.append("option").text(name).property("value", name))
      // buildPlots(names[0]);
      data(names[0]);
   });


};

//  HINT 1 When importing json, try using metadata
function data(sample) {
 d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

     // console.log(result);
  // Set panel body for demographics section
  var panelBody = d3.select(".panel-body");
      panelBody.html("");
  // Get the entries for each object in the array, append to panel
      Object.entries(result).forEach(([key, value]) => {
      panelBody.append("h6").text(`${key}: ${value} `);
      //console.log(`Key: ${key} and Value ${value}`);
   
   // Build plots
   // set up filter for variables
   var samples = data.samples;
   var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
   var arrayResult = samplesArray[0];
   // set up variables for plots
   var topSampleValues = arrayResult.sample_values.slice(0,10).reverse();
   var topOtuIds = arrayResult.otu_ids.slice(0,10).map(otuid => "OTU" + otuid).reverse();
   var topOtuLabels = arrayResult.otu_labels.slice(0,10);
   var sampleValues = arrayResult.sample_values;
   var otuIds = arrayResult.otu_ids;
   var otuLabels = arrayResult.otu_labels;

   // Bar chart
   var trace1 = {
      x: topSampleValues,
      y: topOtuIds,
      type: 'bar',
      orientation: 'h',
      text: topOtuLabels,

    };
    var bar = [trace1];

    var layout = {
      title: "Top 10 OTUs in Sample",
      xaxis: {
         title: "Sample Value"
      },
      yaxis: {
         ticktext: topOtuLabels,
      }
      
    };
    
    Plotly.newPlot("bar", bar, layout);

    // Bubble chart
    var trace2 = {
       x: otuIds,
       y: sampleValues,
       text: otuLabels,
       mode: "markers",
       marker: {
          size: sampleValues,
          color: otuIds
       }
    };
    var bubble = [trace2];

    var bubbleLayout = {
       title: "OTU IDs vs Sample Values",
       xaxis: {
          title: "OTU ID"
       },
       yaxis: {
          title: "Sample Value"
       }
    };
    Plotly.newPlot("bubble", bubble, bubbleLayout);
  })
 })
}

// add optionChanged for element .onchange to populate demographics with user input
function optionChanged(dropDownValue) {
   data(dropDownValue);
  
 };

init();







