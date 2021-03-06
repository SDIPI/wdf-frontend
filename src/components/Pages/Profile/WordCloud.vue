<template>
  <div>
    <h2 class="mb-0">
      Wordcloud
    </h2>
    <div id="vis"></div>
    <p>
      <span class="hint badge badge-secondary" data-toggle="tooltip" data-placement="bottom"
            title="This page shows a purely visual representation of the words you read the most while navigating.
            The top 50 words you read the most often are displayed here.
            A bigger word means it you read it more often.">What is this ?</span>
    </p>
  </div>
</template>

<script>
  import ProfileStore from "../../../stores/ProfileStore";

  function tfIdf(tf, df, documents) {
    return tf * Math.log(documents / df);
  }

  function enableTooltips() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  function drawCloud() {
    var tags = [];
    for (var i in ProfileStore.data.watchedKeyWords) {
      tags.push({"key": i, "value": ProfileStore.data.watchedKeyWords[i]});
    }

    tags = tags.splice(0, 200);

    var fill = d3.scale.category20b();

    var w = 1100,
      h = 600;

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

    function draw(data, bounds) {
      var w = 1100,
        h = 600;

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
        return "Arimo"//;d.font;
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
      enableTooltips();
    }
  }
</script>

<style>
  canvas#wordcloud {
    width: 100%;
  }
</style>
