function* uint32IdGenerator(id: number) {
  while (true) {
    yield id - 1;
  }
}

export const uint32Generator = uint32IdGenerator(Number.MIN_SAFE_INTEGER);
