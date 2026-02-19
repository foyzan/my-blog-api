const userService = require('../../../../lib/user')

const findSingle = async (req, res, next) => {
    const id = req.params.id;
    const expand = req.query.expand || "";

    try {
        const { user, comments = null, articles = null } = await userService.findSingleItem({
            id: id,
            expend: expand,
        });

        // response

        const url = req.baseUrl + req.path
        const response = {
            code: 200,
            message: 'successful',
            data: user,
            comments: comments,
            articles: articles,
            links: {
                self: url,
                article: `${url}/articles`,
                comment: `${url}/comments`,
            },
        };

        if (!comments) {
            delete response.comments
        }

        if(!articles){
            delete response.articles
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = findSingle