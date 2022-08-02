import defendants from '../../../defendants.json'

export default function handler(req,res) {
    res.status(200).json(defendants)
}