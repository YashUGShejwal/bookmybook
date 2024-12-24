const RatingModel =require('../models/RatingSchema')
const BookModel =require('../models/BookSchema')

const rateabook=async (req,res)=>{
    const bookid=req.params.id
    const rating=req.params.rating
    try {
        let ratearr=[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]
        const alreadyrated=await RatingModel.findOne({userid:req.user._id, bookid})
        
        if(alreadyrated){

            console.log("user had already rated as ",alreadyrated.rating)
            const book1=await BookModel.findById(bookid)
            console.log("book here",book1,rating)
            await RatingModel.findByIdAndUpdate(alreadyrated._id,{bookid,rating})
            let bookrating=await RatingModel.find({bookid})
            let sum=0
            bookrating.forEach((e)=>{
                sum+=e.rating
            })
            let newrating=sum/book1.numratings
            // let newrating=((((book.rating)*(book.numratings)- (alreadyrated.rating ))/(book.numratings-1))+ rating)/(book.numratings)
            // console.log(book1.rating,book1.numratings,alreadyrated.rating,rating,book1.numratings)
            // let newrating=(((book1.rating)*(book1.numratings)) - alreadyrated.rating + rating)/book1.numratings
            // console.log("NEW but old RATING ",newrating)
            let distance=[]
            ratearr.forEach(element => {
                distance.push(Math.abs(element-newrating))
            });
            newrating=ratearr[distance.indexOf(Math.min(...distance))]
            await BookModel.findByIdAndUpdate(bookid,{rating: newrating, numratings:book1.numratings})
            // await RatingModel.findByIdAndUpdate(alreadyrated._id,{bookid,rating})
            res.status(200).send({message:"rating updated"}) 
        }
        else{
            const book2=await BookModel.findById(bookid)
            // console.log("book here",book2,rating)
            let newrating=((book2.rating)*(book2.numratings) + rating)/(book2.numratings+1)
            // console.log("NEW RATING ",newrating)

            let distance=[]
            ratearr.forEach(element => {
                distance.push(Math.abs(element-newrating))
            });
            newrating=ratearr[distance.indexOf(Math.min(...distance))]
            await BookModel.findByIdAndUpdate(bookid,{rating: newrating, numratings:book2.numratings+1})
            const newrate2=new RatingModel({userid:req.user._id, bookid,rating})
            newrate2.save()
            res.status(200).send({message:"rating updated"})
        }
   
    } catch (error) {
        console.log(error)
        res.status(403).send({message:"error occured"})

    }
}


module.exports={
    rateabook
}