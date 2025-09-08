const registerUser = async (req, res) => {
    try {

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred! Please try again."
        })
    }
}