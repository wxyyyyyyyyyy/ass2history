function saveResult(expression, result) {
    $.ajax({
      url: "http://localhost:3000/saveResult",
      type: "POST",
      data: {
        expression: expression,
        result: result
      },
      success: function (response) {
        console.log(response);
        displayHistory()
      },
      error: function () {
        console.log("Error saving result");
      }
    });
  }

  function getPreviousResults() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:3000/getPreviousResults",
        type: "GET",
        success: function (response) {
          console.log(response);
          resolve(response)
        },
        error: function () {
          reject()
          console.log("Error getting previous results");
        }
      });
    })
  }
  function removeHistory() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:3000/removePreviousResults",
        type: "POST",
        success: function (response) {
          console.log(response);
          resolve(response)
        },
        error: function () {
          reject()
          console.log("Error getting previous results");
        }
      });
    })
  }
