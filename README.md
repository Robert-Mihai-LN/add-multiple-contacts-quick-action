data-*  -> we can get the value of those in an event like 

e.target.dataset.* 
where * is whatever follows data-
E.g

data-someshit 

handler(e){
    console.log(e.target.dataset.someshit);
}