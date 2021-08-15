export const articles_url= 'https://newsapi.org/v2/everything';
export const country_code= 'it';
export const category='general';
export const _api_key='yourApiKey';

export async function getArticles() {

    try {
        let articles = await fetch(`${articles_url}?domains=formulapassion.it`, {
            headers: {
                'X-API-KEY': _api_key
            }
        });

        let result = await articles.json();
        article = null;

        return result.articles;
    }
    catch(error) {
        throw error;
    }
}
