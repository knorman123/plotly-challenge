




//  When importing json, try using metadata
function data(sample) {
 d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var names = data.names;
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

      var dropDown = d3.select("#selDataset");
      names.forEach(name => dropDown.append("option").text(name).property("value", name))

  })
 })
};

// Create drop down of sample ids

   
// test the function
data('940')






//  Event Listener is different in this html, review id="selDataset" in index.html
//   <select id="selDataset" onchange="optionChanged(this.value)"></select>
