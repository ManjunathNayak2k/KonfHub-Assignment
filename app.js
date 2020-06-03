var request=require("request")

request("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences",function (error, response, body) {
    if(!error && response.statusCode == 200)
    {
        
        var parsedData=JSON.parse(body);//Parsing data 

        //Displaying Paid Conferences
        console.log("==============================================")
        console.log("\t\tPaid Conferences: ")
        console.log("==============================================")
        
        parsedData["paid"].forEach(element => {
            console.log("Conference name: "+element["confName"])
            console.log("City: "+element["city"])
            console.log("State: "+element["state"])
            console.log("Country: "+element["country"])
            console.log("Start Date: " + element["confStartDate"])
            console.log("End Date: " + element["confEndDate"])
            console.log("Register at:" + element["confRegUrl"])
            console.log("\n")
        });

        //Displaying Free Conferences
        console.log("==============================================")
        console.log("\t\tFree Conferences: ")
        console.log("==============================================")

        parsedData["free"].forEach(element => {
            console.log("Conference name: " + element["confName"])
            console.log("City: " + element["city"])
            console.log("State: " + element["state"])
            console.log("Country: " + element["country"])
            console.log("Start Date: " + element["confStartDate"])
            console.log("End Date: " + element["confEndDate"])
            console.log("Register at:" + element["confRegUrl"])
            console.log("\n")
        });

        //Preprocessing: Trimming the strings for cases where additional spaces were provided
        let element=parsedData["paid"]//stores the paid conference objects
        for(let i=0;i<parsedData["paid"].length;i++)
        {
            for(const key in element[0]){
                if(typeof(element[i][key])=="string")
                element[i][key]=element[i][key].trim()
            }
        }

        //Finding exact duplicates in paid conferences
        let duplicate=[]//stores the duplicates 
        console.log("==============================================")
        console.log("\t\tDuplicates in Paid Conf:")
        console.log("==============================================\n")
        for (let i = 0; i < parsedData["paid"].length;i++)
        {
            for (let j = i+1; j < parsedData["paid"].length;j++)
            {
                var flag=1//to check for duplicates
                for(const key in element[0]){
                    
                    if(element[i][key]!=element[j][key])
                    {
                        
                        flag=0;
                        break;
                    }
                }
                if(flag==1)
                {
                    console.log("Exact Duplicate of object at index "+i+" found at index: "+j+"\n")
                    duplicate.push(element[j])
                }
            }
        }
        if (duplicate.length)
        {   
            console.log("\t\tList of Duplicates: \n")
            console.log(duplicate)
        }
        else
            console.log("No Exact Duplicates found\n")
        
        //Preprocessing: Trimming the strings
        var element1 = parsedData["free"]//stores the free conference objects
        for (let i = 0; i < parsedData["free"].length; i++) {
            for (const key in element1[0]) {
                if (typeof (element1[i][key]) == "string")
                    element1[i][key] = element1[i][key].trim()
            }
        }

        //Finding exact duplicates in free conferences
        console.log("==============================================")
        console.log("\t\tDuplicates in Free Conf:")
        console.log("==============================================\n")
        
        duplicate = []// stores the duplicates
        
        for (let i = 0; i < parsedData["free"].length; i++) {
            for (let j = i + 1; j < parsedData["free"].length; j++) {
                var flag = 1//to check for duplicates
                for (const key in element1[0]) {
                    if (element1[i][key] != element1[j][key]) {
                        
                        flag = 0;
                        break;
                    }
                }
                if (flag == 1) {
                    console.log("Exact Duplicate of object at index "+i+" found at index: "+j+"\n")
                    duplicate.push(element1[j])
                }
            }
        }
        if(duplicate.length)
            console.log(duplicate)
        else
            console.log("No Exact Duplicates found\n")

        //Checking semantic duplicates in paid conferences

        var flag1=0// to check for semantic duplicates
        console.log("======================================================")
        console.log("\t\tSemantic Duplicates in Paid Conf:")
        console.log("======================================================\n")
        for (let i = 0; i < parsedData["paid"].length;i++)
        {
            for (let j = i + 1; j < parsedData["paid"].length; j++) {
                if (element[i]["conference_id"] == element[j]["conference_id"] && element[i]["confStartDate"] == element[j]["confStartDate"])
                {
                    console.log("Semantic Duplicate of object at index " + i + " found at index: " + j+"\n")
                    flag1=1;
                }
            }
        }
        if(!flag1)
            console.log("No Semantic Duplicates found\n")
        
        flag1=0

        //Checking semantic duplicates in free conferences
        
        console.log("======================================================")
        console.log("\t\tSemantic Duplicates in Free Conf:")
        console.log("======================================================\n")
        for (let i = 0; i < parsedData["free"].length; i++) {
            for (let j = i + 1; j < parsedData["free"].length; j++) {
                if (element1[i]["conference_id"] == element1[j]["conference_id"] && element1[i]["confStartDate"] == element1[j]["confStartDate"])
                {
                    console.log("Semantic Duplicate of object at index " + i + " found at index: " + j + "\n")
                    flag1=1;
                }    
            }
        }
        if(!flag1)
            console.log("No Semantic Duplicates found\n")
        
    }
});