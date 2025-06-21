/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function(jewels, stones) {
    const jewelMap=new Set()

    for(let i=0;i<jewels.length;i++){
        jewelMap.add(jewels[i])
    }
    let jewelsInStonesCount=0
    for(let i=0;i<stones.length;i++){
         if(jewelMap.has(stones[i])){
            jewelsInStonesCount++
        }
    }
    return jewelsInStonesCount;
};


//https://leetcode.com/problems/jewels-and-stones/description/
