const uint32Max = 4294967295;

function* uint32IdGenerator(id: number) {
  while (true) {
    yield id - 1;
  }
}

export const uint32Generator = uint32IdGenerator(uint32Max);
