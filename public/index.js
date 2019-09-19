let containers = document.getElementsByClassName("container")

for (let index = 0; index < containers.length; index++) {
  const element = containers[index]
  const elementValue = element.dataset.key

  const obj = {
    value: elementValue
  }

  element.addEventListener("click", async () => {
    // console.log(sendObj)
    await fetch("/getDownload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  })
}
