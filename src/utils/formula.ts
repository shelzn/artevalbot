export function calculateWinRate(
  match: number,
  current_wr: number,
  target_wr: number
): number {
  let tWin = match * (current_wr / 100);
  let tLose = match - tWin;
  let sisaWr = 100 - target_wr;
  let wrResult = 100 / sisaWr;
  let seratusPersen = tLose * wrResult;
  let final = seratusPersen - match;
  return Math.round(final);
}

export function calculateMagicWheel(fragment: number): number {
  let result = 0;
  let spin = 0;
  let jumlah_spin = 0;
  if (fragment < 196) {
    spin = 200 - fragment;
    jumlah_spin = Math.ceil(spin / 5);
    result = jumlah_spin * 270;
  }
  if (fragment > 195) {
    spin = 200 - fragment;
    result = spin * 60;
  }

  return result;
}

export function calculateZodiac(star: number): number {
  let result = 0;
  if (star < 90) {
    result = Math.ceil(((2000 - star * 20) * 850) / 1000);
  }
  if (star > 89) {
    result = Math.ceil(2000 - star * 20);
  }

  return result;
}
