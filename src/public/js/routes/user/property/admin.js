import axios from "axios";

console.log(`Admin script`);

async function setImageSource() {
    console.log(`Fetch data`);
    
    let data = await axios({
        method: 'get',
        url: `${location.origin}/user/property/operation/get_all`,
    })
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.log(`Error: `, err);
            return;
        });
    
    console.log(`Data: `, data);
    
    if(data) {
        // Update images source
        
    }
}

setImageSource();
