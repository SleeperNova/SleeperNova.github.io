function buildCharts(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) =>{
        let samples = data.samples;
        let resultArray = samples.filter((sampleDictionary) => sampleDictionary.id == sample);
        let result = resultArray[0];

        let otuIDs =result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t:0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t:30}

        };
        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIDs,
                    colorscale: "Earth"
                }
            }
        ]

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        let yticks = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let barData = [
            {
                y: yticks,
                x: sampleValues.slice(0, 10).reverse(),
                text:otuLabels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        let barLayout = {
            title: "<br>Top 10 Bacteria Cultures Found",
            margin: {t: 70, l: 150}
        }

        Plotly.newPlot("bar", barData, barLayout);

    });
}

function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) =>{
        let metadata = data.metadata;

        let resultArray = metadata.filter((sampleDictionary) => sampleDictionary.id == sample);

        let result = resultArray[0];

        let PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        for (key in result) {
             PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
        }

        // Bonus
        buildGauge(result.wfreq);
    })    

}

function init(){
    let selector = d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let sampleNames = data.names;

        for(let i = 0; i < sampleNames.length; i++){
          selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
        }

        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample)
    })

}

function optionChanged(newSample){
    buildCharts(newSample);
    buildMetadata(newSample);
}

init();