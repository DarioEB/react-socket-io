

export const getLasts = async () => {

    const response = await fetch(`http://localhost:8080/lasts`);
    const data = await response.json();

    return data.lasts;

}