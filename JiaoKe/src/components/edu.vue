<template>
  <div class="map">
    <sm-web-map server-url="http://10.168.1.109:8190/iportal/" map-id="745804769">
      <sm-search
        position="top-left"
        :online-local-search="onlineLocalSearch"
      ></sm-search>
      <sm-coordinate-conversion position="top-right"></sm-coordinate-conversion>
      <sm-measure position="bottom-right"></sm-measure>
      <sm-draw position="bottom-right" ></sm-draw>
      <sm-scale position="bottom-left"></sm-scale>
    </sm-web-map>
  </div>
</template>

<script>
export default {
  name: "edu"
}
</script>

<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }
</style>
