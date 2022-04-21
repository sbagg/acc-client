const API = {};

API.kc = () => {
  const fetchedData = fetch('/api/kc/')
    .then(result => result.json())
    .then(data => {
        return {"fields": data.data.fields, "rows": data.data.rows, "entriesNo": data.data.rowCount};//data;
    })
    return fetchedData;
}

API.kcDate = () => {
  const fetchedData = fetch('/api/kc_dates/')
    .then(result => result.json())
    .then(data => {
        return {"fields": data.data.fields, "rows": data.data.rows, "entriesNo": data.data.rowCount};//data;
    })
    return fetchedData;
}

API.eto = () => {
  const fetchedData = fetch('/api/eto/')
    .then(result => result.json())
    .then(data => {
        return {"fields": data.data.fields, "rows": data.data.rows, "entriesNo": data.data.rowCount};//data;
    })
    return fetchedData;
}

API.grid = () => {
  const fetchedData = fetch('/api/grid/')
    .then(result => result.json())
    .then(data => {
        return {"fields": data.data.fields, "rows": data.data.rows, "entriesNo": data.data.rowCount};//data;
    })
    return fetchedData;
}

API.calc = () => {
  const fetchedData = fetch('/api/calculations/')
    .then(result => result.json())
    .then(data => {
        return {"fields": data.data.fields, "rows": data.data.rows, "entriesNo": data.data.rowCount};//data;
    })
    return fetchedData;
}

export default API;