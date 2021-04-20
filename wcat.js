let fs=require("fs");
//const { formatWithOptions } = require("node:util");
let input=process.argv.slice(2);

let option=[],filePaths=[];
//to extract options and file path 

for(let i=0;i<input.length;i++)
{
    if(input[i]=="-s"||input[i]=="-n"||input[i]=="-b")
    {
        option.push(input[i]);
    }else{
        filePaths.push(input[i]);
    }
}

let finalOption="-s";
//prioritise 1st option("-n" or "-b")
if(option.includes("-n")&&option.includes("-b"))
{
    let idxB=option.indexOf("-b");
    let idxN=option.indexOf("-n");
    finalOption= idxB<idxN ? "-b":"-n";
}
else if(option.includes("-b"))
{
    finalOption="-b";
}else if(option.includes("-n"))
{
    finalOption="-n";
}

console.log("option ",option);
//console.log("file path ", filePaths);

//check if all paths are correct
for(let i=0;i<filePaths.length;i++)
{
    let isFilePresent=fs.existsSync(filePaths[i]);
    if(isFilePresent==false){
        console.log("filepath ", filePaths[i]," does not exist");
        return;
    }
}

// to read content from file paths
let totalContent="";
for(let i=0;i<filePaths.length;i++){
    let contentOfCurr=fs.readFileSync(filePaths[i]);
    totalContent+=contentOfCurr+"\r\n";
}
//console.log(totalContent);
//totalContent is the full file without any option


let newContent=totalContent;
//implement -s ==> remove empty line breaks
if(option.includes("-s"))
{
    let contentArr=totalContent.split("\r\n");
    //console.log(contentArr);
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
            tempArr.push(contentArr[i]);
        }
    }
    
    newContent=tempArr.join("\r\n");
    
    
}

totalContent=newContent;

if(finalOption=="-n")
{
    let contentArr=totalContent.split("\r\n");
    for(let i=0;i<contentArr.length;i++)
    {
        contentArr[i]=i+1+". "+contentArr[i];
    }

    newContent=contentArr.join("\r\n");
    
}

if(finalOption=="-b")
{
    let contentarr=totalContent.split("\r\n");
    let k=1;
    for(let i=0;i<contentarr.length;i++)
    {
        if(contentarr[i]!="")
        {
            contentarr[i]=k+". "+contentarr[i];
            k++;
        }
    }
    newContent=contentarr.join("\r\n");
    

}
console.log(newContent);