import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';

import { toSignal, toObservable } from '@angular/core/rxjs-interop';

import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListSkeleton, PokemonList],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage implements OnInit /* , OnDestroy */ {
  public isLoading = signal(true);

  private pokemonsService = inject(Pokemons);
  public pokemons = signal<SimplePokemon[]>([]);
  private route = inject(ActivatedRoute); // Query Parameters
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => {
        return params.get('page') ?? '1';
      }),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService
      .loadpage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        //console.log('On Init');
        this.pokemons.set(pokemons);
      });
  }
  /*   private appRef = inject(ApplicationRef);

  private $appState = this.appRef.isStable.subscribe((isStable) => {
    console.log({ isStable });
  });  */
  /*
  ngOnDestroy(): void {
    console.log('destroy');
    this.$appState.unsubscribe();
  } */
  ngOnInit(): void {
    this.loadPokemons();
    console.log(this.currentPage());
  }
}
