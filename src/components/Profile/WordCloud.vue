<template>
  <div>
    <div id="vis"></div>
  </div>
</template>

<script>
  import ProfileStore from "../../stores/ProfileStore";

  function tfIdf(tf, df, documents) {
    return tf * Math.log(documents / df);
  }

  function drawCloud() {
    var data = ProfileStore.data.watchedSitesWithWords;
    var tags = [];
    var tagsDict = {};
    console.log("DRAW CLOUD");
    console.log(data);
    for (var i in data) {
      var el = data[i];
      for (var wordI in el.words) {
        var word = el.words[wordI];
        if (word.word in tagsDict) {
          tagsDict[word.word] += tfIdf(word.tf, word.df, ProfileStore.data.nbDocuments) * el.time;
        } else {
          tagsDict[word.word] = tfIdf(word.tf, word.df, ProfileStore.data.nbDocuments) * el.time;
        }
      }
    }

    for (var i in tagsDict) {
      tags.push({"key": i, "value": tagsDict[i]});
    }

    console.log(tagsDict);
    //.map((e) => {return {key: e.url, value: e.words[0]}});
    //var tags = [{"key": "Cat", "value": 260}, {"key": "fish", "value": 190}, {"key": "things", "value": 180}];

    var fill = d3.scale.category20b();

    var w = 1100,
      h = 500;

    var max,
      fontSize;

    var layout = d3.layout.cloud()
      .timeInterval(Infinity)
      .size([w, h])
      .fontSize(function(d) {
        return fontSize(+d.value);
      })
      .text(function(d) {
        return d.key;
      })
      .on("end", draw);

    var svg = d3.select("#vis").append("svg")
      .attr("width", w)
      .attr("height", h);

    var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

    update();

    /*window.onresize = function(event) {
      update();
    };*/

    function draw(data, bounds) {
      var w = 1100,
        h = 500;

      svg.attr("width", w).attr("height", h);

      var scale = bounds ? Math.min(
        w / Math.abs(bounds[1].x - w / 2),
        w / Math.abs(bounds[0].x - w / 2),
        h / Math.abs(bounds[1].y - h / 2),
        h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

      var text = vis.selectAll("text")
        .data(data, function(d) {
          return d.text.toLowerCase();
        });
      text.transition()
        .duration(1000)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .style("font-size", function(d) {
          return d.size + "px";
        });
      text.enter().append("text")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .style("font-size", function(d) {
          return d.size + "px";
        })
        .style("opacity", 1e-6)
        .transition()
        .duration(1000)
        .style("opacity", 1);
      text.style("font-family", function(d) {
        return d.font;
      })
        .style("fill", function(d) {
          return "red";//fill(d.text.toLowerCase());
        })
        .text(function(d) {
          return d.text;
        });

      vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
    }

    function update() {
      layout.font('impact').spiral('archimedean');
      fontSize = d3.scale['sqrt']().range([10, 100]);
      if (tags.length){
        fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
      }
      layout.stop().words(tags).start();
    }
  }

  export default {
    name: 'WordCloud',
    components: {
    },
    data() {
      return {
        ProfileStore: ProfileStore.data
      };
    },
    methods: {},
    mounted() {
      drawCloud();
    }
  }
</script>

<style>
  canvas#wordcloud {
    width: 100%;
  }
</style>
