const edit = async (req, res) => {
    // Get price and category
    const [
        categories,
        prices,
    ] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ]);
    
    return res.render(
        "user/property/edit", {
        page: "Edit property",
        categories,
        prices,
        property: req.body,
    });
}

export default edit;
