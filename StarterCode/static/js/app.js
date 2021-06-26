




//  When importing json, try using metadata

 d3.json("StarterCode/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == samples);
    var result = resultArray[0];

    console.log(result);

 });



//  Event Listener is different in this html, review id="selDataset" in index.html
//   <select id="selDataset" onchange="optionChanged(this.value)"></select>
