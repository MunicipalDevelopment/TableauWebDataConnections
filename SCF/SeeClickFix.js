(function() {



  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function(schemaCallback) {
    var cols = [
      { id: "id", alias: "ID", dataType: tableau.dataTypeEnum.integer },
{ id: "lat", alias: "Latitude", dataType: tableau.dataTypeEnum.float },
{ id: "lng", alias: "Longitude", dataType: tableau.dataTypeEnum.float },
{ id: "description", alias: "Description", dataType: tableau.dataTypeEnum.string },
{ id: "address", alias: "Address", dataType: tableau.dataTypeEnum.string },
{ id: "type", alias: "Issue Type", dataType: tableau.dataTypeEnum.string },
{ id: "reporter", alias: "Reportes", dataType: tableau.dataTypeEnum.string },
{ id: "reporterID", alias: "Reporter ID", dataType: tableau.dataTypeEnum.string }

    ];

    var tableInfo = {
        alias: "SCF Feed",
        id: 'SCFData',
        columns: cols
    };

    schemaCallback([tableInfo]);
  };

  myConnector.getData = function(table, doneCallback) {





      var xhr = $.ajax({
        url: "https://seeclickfix.com/api/v2/issues?min_lat=35.02212&min_lng=-106.79672&max_lat=35.20636&max_lng=-106.48911&per_page=100",
        success: function (response) {


          var tableData = [];

          var d= response;
          for (var i = 0; i < d.issues.length; i++) {

              tableData.push({
                  "id": d.issues[i].id,
                  "status": d.issues[i].status,
                  "lat": d.issues[i].lat,
                  "lng": d.issues[i].lng,
                  "description": d.issues[i].description,
                  "address": d.issues[i].address,
                  "type": d.issues[i].request_type.title,
                "reporter": d.issues[i].reporter.name,
                  "reporterID": d.issues[i].reporter.id

              });
  }


          table.appendRows(tableData);
          doneCallback();
          // tableau.dataCallback(tableData, "", false);
        }//success
      });
    };

    tableau.registerConnector(myConnector);
  })();

$(document).ready(function(){
  $("#submitButton").click(function() { // This event fires when a button is clicked
    tableau.connectionName = 'SCF Connection';
    tableau.submit();
  });
});
