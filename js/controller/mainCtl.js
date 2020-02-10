// save all business logic
const controller = {}

function tranformDocs(docs){
    let datas = [];
    for(let doc of docs){
        let data = doc.data();
        data.id = doc.id;
        datas.push(data);
    }
    return datas;
}

function tranformDoc(doc){
    let data = doc.data()
    data.id = doc.id
    return data
}