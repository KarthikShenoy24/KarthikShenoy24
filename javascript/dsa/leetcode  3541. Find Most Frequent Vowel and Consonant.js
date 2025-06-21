/**
 * @param {string} s
 * @return {number}
 */
var maxFreqSum = function (s) {

    const freqMap = {}
    for (let i = 0; i < s.length; i++) {
        freqMap[s[i]] = !freqMap[s[i]] ? 1 : ++freqMap[s[i]]
    }
    let vowelMaxFreq=0;
    let consonantMaxFreq=0;

    const vowels=['a','e','i','o','u']
    const freqMapKeys=Object.keys(freqMap)
    for(let i=0;i<freqMapKeys.length;i++){
        if(vowels.includes(freqMapKeys[i])){
            vowelMaxFreq=Math.max(vowelMaxFreq,freqMap[freqMapKeys[i]])
        }else{
            consonantMaxFreq=Math.max(consonantMaxFreq,freqMap[freqMapKeys[i]])
        }
    }

    return consonantMaxFreq+vowelMaxFreq
};

//https://leetcode.com/problems/find-most-frequent-vowel-and-consonant/description/
