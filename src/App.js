import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setpokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  // useEffect: レンダリング後に実行される
  useEffect(() => {
    // const: 変数の再宣言を防ぐ、変数の再代入を防ぐ、ブロックスコープ
    const fetchpokemonData = async () => {
      // すべてのポケモンのデータを取得
      // let: 変数の再宣言を防ぐ、変数の再代入を許可、ブロックスコープ
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadpokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous); // null
      // console.log(res.results);
      setLoading(false);
    };
    fetchpokemonData();
  }, []);

  const loadpokemon = async (data) => {
    // Promise.all: 複数のPromiseを受け取り、それらの全てが完了した時に新しいPromiseを返す
    let _pokemonData = await Promise.all(
      // map: 配列の要素を変換する　pokemon: 配列の要素
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setpokemonData(_pokemonData);
  };

  console.log(pokemonData);

  const handleNextPage = async() => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    // console.log(data);
    await loadpokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async() => {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadpokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className='App'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
