import { TestBed } from '@angular/core/testing';
import { LikesService } from './likes.service';

const STORAGE_KEY = 'as_liked_artworks';

describe('LikesService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should start empty when nothing is stored', () => {
    const service = TestBed.inject(LikesService);

    expect(service.likedIds()).toEqual([]);
    expect(service.isLiked(1)).toBe(false);
  });

  it('should load the ids saved in LocalStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([3, 7]));

    const service = TestBed.inject(LikesService);

    expect(service.likedIds()).toEqual([3, 7]);
    expect(service.isLiked(3)).toBe(true);
    expect(service.isLiked(4)).toBe(false);
  });

  it('should mark an artwork', () => {
    const service = TestBed.inject(LikesService);

    service.toggle(5);

    expect(service.isLiked(5)).toBe(true);
    expect(service.likedIds()).toEqual([5]);
  });

  it('should unmark an artwork that was already marked', () => {
    const service = TestBed.inject(LikesService);

    service.toggle(5);
    service.toggle(5);

    expect(service.isLiked(5)).toBe(false);
    expect(service.likedIds()).toEqual([]);
  });

  it('should keep the other artworks when one is unmarked', () => {
    const service = TestBed.inject(LikesService);

    service.toggle(1);
    service.toggle(2);
    service.toggle(1);

    expect(service.likedIds()).toEqual([2]);
  });

  it('should write every change to LocalStorage', () => {
    const service = TestBed.inject(LikesService);

    service.toggle(1);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[1]');

    service.toggle(2);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[1,2]');

    service.toggle(1);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[2]');
  });

  it('should restore the likes in a new instance, like after a reload', () => {
    TestBed.inject(LikesService).toggle(9);

    TestBed.resetTestingModule();
    const reloaded = TestBed.inject(LikesService);

    expect(reloaded.isLiked(9)).toBe(true);
  });
});
