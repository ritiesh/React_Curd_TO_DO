const apiRequest=async(url='',optionsObj,errMsg)=>{
  try{
  const response=await fetch(url,optionsObj)
  if(!response.ok)throw Error("Please reload the app")
  }
catch(error)
{
  errMsg=error.message
}finally{
  return errMsg
}
}
export default apiRequest