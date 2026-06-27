"use strict";

const SYMBOLS = ["lozenge", "pound", "slash", "currency"];
const SYMBOL_LABELS = {
  lozenge: "◇",
  pound: "#",
  slash: "/",
  currency: "¤"
};

const DIFFICULTIES = {
  EASY: { label: "Helppo", level: 1, maxVerifier: 17 },
  STANDARD: { label: "Normaali", level: 2, maxVerifier: 22 },
  HARD: { label: "Vaikea", level: 3, maxVerifier: 48 }
};

const COLOR_NAMES = {
  blue: "sininen",
  yellow: "keltainen",
  purple: "violetti"
};

const COMPARE_WORDS = {
  lt: "on pienempi kuin",
  eq: "on sama kuin",
  gt: "on suurempi kuin",
  le: "on pienin tai jaettu pienin",
  ge: "on suurin tai jaettu suurin"
};

const CHECK_CARDS = {
  1: { lozenge: 201, pound: 798, slash: 204, currency: 796 },
  2: { lozenge: 206, pound: 793, slash: 212, currency: 790 },
  3: { lozenge: 215, pound: 786, slash: 217, currency: 783 },
  4: { lozenge: 220, pound: 781, slash: 223, currency: 779 },
  5: { lozenge: 227, pound: 776, slash: 231, currency: 773 },
  6: { lozenge: 233, pound: 770, slash: 237, currency: 767 },
  7: { lozenge: 244, pound: 765, slash: 251, currency: 759 },
  8: { lozenge: 253, pound: 757, slash: 256, currency: 754 },
  9: { lozenge: 261, pound: 750, slash: 264, currency: 747 },
  10: { lozenge: 267, pound: 744, slash: 270, currency: 742 },
  11: { lozenge: 274, pound: 740, slash: 278, currency: 738 },
  12: { lozenge: 280, pound: 736, slash: 282, currency: 733 },
  13: { lozenge: 286, pound: 729, slash: 288, currency: 725 },
  14: { lozenge: 293, pound: 720, slash: 296, currency: 718 },
  15: { lozenge: 302, pound: 715, slash: 304, currency: 710 },
  16: { lozenge: 309, pound: 708, slash: 312, currency: 704 },
  17: { lozenge: 315, pound: 699, slash: 317, currency: 696 },
  18: { lozenge: 322, pound: 694, slash: 325, currency: 690 },
  19: { lozenge: 329, pound: 687, slash: 331, currency: 684 },
  20: { lozenge: 334, pound: 680, slash: 337, currency: 673 },
  21: { lozenge: 339, pound: 669, slash: 341, currency: 667 },
  22: { lozenge: 346, pound: 664, slash: 348, currency: 662 },
  23: { lozenge: 350, pound: 658, slash: 353, currency: 656 },
  24: { lozenge: 356, pound: 653, slash: 358, currency: 651 },
  25: { lozenge: 360, pound: 649, slash: 365, currency: 647 },
  26: { lozenge: 370, pound: 645, slash: 373, currency: 641 },
  27: { lozenge: 376, pound: 639, slash: 378, currency: 637 },
  28: { lozenge: 381, pound: 635, slash: 385, currency: 633 },
  29: { lozenge: 387, pound: 631, slash: 390, currency: 629 },
  30: { lozenge: 392, pound: 627, slash: 394, currency: 621 },
  31: { lozenge: 396, pound: 617, slash: 401, currency: 615 },
  32: { lozenge: 403, pound: 613, slash: 405, currency: 610 },
  33: { lozenge: 407, pound: 608, slash: 410, currency: 605 },
  34: { lozenge: 413, pound: 599, slash: 416, currency: 597 },
  35: { lozenge: 419, pound: 595, slash: 423, currency: 593 },
  36: { lozenge: 429, pound: 591, slash: 432, currency: 589 },
  37: { lozenge: 434, pound: 587, slash: 437, currency: 585 },
  38: { lozenge: 440, pound: 581, slash: 442, currency: 579 },
  39: { lozenge: 447, pound: 577, slash: 453, currency: 573 },
  40: { lozenge: 455, pound: 571, slash: 459, currency: 567 },
  41: { lozenge: 462, pound: 564, slash: 464, currency: 562 },
  42: { lozenge: 470, pound: 558, slash: 472, currency: 553 },
  43: { lozenge: 475, pound: 550, slash: 479, currency: 547 },
  44: { lozenge: 481, pound: 543, slash: 483, currency: 540 },
  45: { lozenge: 485, pound: 536, slash: 487, currency: 533 },
  46: { lozenge: 491, pound: 530, slash: 495, currency: 527 },
  47: { lozenge: 497, pound: 523, slash: 499, currency: 518 },
  48: { lozenge: 503, pound: 515, slash: 505, currency: 509 },
  49: { lozenge: 507, pound: 506, slash: 514, currency: 504 },
  50: { lozenge: 516, pound: 502, slash: 520, currency: 498 },
  51: { lozenge: 525, pound: 496, slash: 528, currency: 492 },
  52: { lozenge: 532, pound: 490, slash: 534, currency: 486 },
  53: { lozenge: 537, pound: 484, slash: 541, currency: 482 },
  54: { lozenge: 546, pound: 480, slash: 549, currency: 476 },
  55: { lozenge: 551, pound: 474, slash: 557, currency: 471 },
  56: { lozenge: 560, pound: 469, slash: 563, currency: 463 },
  57: { lozenge: 566, pound: 461, slash: 568, currency: 458 },
  58: { lozenge: 572, pound: 454, slash: 576, currency: 449 },
  59: { lozenge: 578, pound: 445, slash: 580, currency: 441 },
  60: { lozenge: 582, pound: 439, slash: 586, currency: 435 },
  61: { lozenge: 588, pound: 433, slash: 590, currency: 430 },
  62: { lozenge: 592, pound: 424, slash: 594, currency: 421 },
  63: { lozenge: 596, pound: 418, slash: 598, currency: 414 },
  64: { lozenge: 604, pound: 412, slash: 606, currency: 409 },
  65: { lozenge: 609, pound: 406, slash: 611, currency: 404 },
  66: { lozenge: 614, pound: 402, slash: 616, currency: 399 },
  67: { lozenge: 618, pound: 395, slash: 625, currency: 393 },
  68: { lozenge: 628, pound: 391, slash: 630, currency: 389 },
  69: { lozenge: 632, pound: 386, slash: 634, currency: 382 },
  70: { lozenge: 636, pound: 379, slash: 638, currency: 377 },
  71: { lozenge: 640, pound: 374, slash: 643, currency: 372 },
  72: { lozenge: 646, pound: 369, slash: 648, currency: 362 },
  73: { lozenge: 650, pound: 359, slash: 652, currency: 357 },
  74: { lozenge: 654, pound: 355, slash: 657, currency: 352 },
  75: { lozenge: 661, pound: 349, slash: 663, currency: 347 },
  76: { lozenge: 665, pound: 344, slash: 668, currency: 340 },
  77: { lozenge: 670, pound: 338, slash: 677, currency: 335 },
  78: { lozenge: 681, pound: 332, slash: 686, currency: 330 },
  79: { lozenge: 688, pound: 327, slash: 691, currency: 324 },
  80: { lozenge: 695, pound: 319, slash: 697, currency: 316 },
  81: { lozenge: 701, pound: 314, slash: 706, currency: 311 },
  82: { lozenge: 709, pound: 308, slash: 714, currency: 303 },
  83: { lozenge: 717, pound: 299, slash: 719, currency: 294 },
  84: { lozenge: 723, pound: 289, slash: 726, currency: 287 },
  85: { lozenge: 737, pound: 279, slash: 739, currency: 277 },
  86: { lozenge: 741, pound: 273, slash: 743, currency: 268 },
  87: { lozenge: 746, pound: 266, slash: 749, currency: 263 },
  88: { lozenge: 751, pound: 257, slash: 755, currency: 255 },
  89: { lozenge: 758, pound: 252, slash: 763, currency: 247 },
  90: { lozenge: 766, pound: 243, slash: 769, currency: 236 },
  91: { lozenge: 771, pound: 232, slash: 775, currency: 228 },
  92: { lozenge: 778, pound: 224, slash: 780, currency: 221 },
  93: { lozenge: 782, pound: 219, slash: 785, currency: 216 },
  94: { lozenge: 787, pound: 213, slash: 792, currency: 207 },
  95: { lozenge: 795, pound: 205, slash: 797, currency: 202 }
};

const VERIFIERS = {
  1: ["v01_blue_eq_1:46", "v01_blue_gt_1:73"],
  2: ["v02_blue_lt_3:92", "v02_blue_eq_3:34", "v02_blue_gt_3:37"],
  3: ["v03_yellow_lt_3:29", "v03_yellow_eq_3:41", "v03_yellow_gt_3:22"],
  4: ["v04_yellow_lt_4:77", "v04_yellow_eq_4:39", "v04_yellow_gt_4:79"],
  5: ["v05_blue_even:89", "v05_blue_odd:59"],
  6: ["v06_yellow_even:44", "v06_yellow_odd:52"],
  7: ["v07_purple_even:32", "v07_purple_odd:74"],
  8: ["v08_no_one:2", "v08_one_one:24", "v08_two_ones:40", "v08_three_ones"],
  9: ["v09_no_three:72", "v09_one_three:93", "v09_two_threes:3", "v09_three_threes"],
  10: ["v10_no_fours:27", "v10_one_four:28", "v10_two_fours:56", "v10_three_fours"],
  11: ["v11_blue_lt_yellow:57", "v11_blue_eq_yellow:85", "v11_blue_gt_yellow:84"],
  12: ["v12_blue_lt_purple:66", "v12_blue_eq_purple:8", "v12_blue_gt_purple:80"],
  13: ["v13_yellow_lt_purple:95", "v13_yellow_eq_purple:91", "v13_yellow_gt_purple:69"],
  14: ["v14_blue_lt_yellow_purple:63", "v14_yellow_lt_blue_purple:14", "v14_purple_lt_blue_yellow:18"],
  15: ["v15_blue_gt_yellow_purple:75", "v15_yellow_gt_blue_purple:19", "v15_purple_gt_blue_yellow:65"],
  16: ["v16_evens_gt_odds:71", "v16_evens_lt_odds:48"],
  17: ["v17_no_evens:51", "v17_one_even:53", "v17_two_evens:67", "v17_three_evens:25"],
  18: ["v18_sum_even:4", "v18_sum_odd:62"],
  19: ["v19_blue_plus_yellow_lt_6:6", "v19_blue_plus_yellow_eq_6:88", "v19_blue_plus_yellow_gt_6:17"],
  20: ["v20_no_repeat:50", "v20_one_double:86", "v20_one_triple:9"],
  21: ["v21_no_twin:47", "v21_one_twin:21"],
  22: ["v22_ascending:33", "v22_descending:12", "v22_no_order:45"],
  23: ["v23_sum_lt_6:26", "v23_sum_eq_6:15", "v23_sum_gt_6:78"],
  24: ["v24_no_consecutive_asc:23", "v24_two_consecutive_asc:11", "v24_three_consecutive_asc:20"],
  25: ["v25_no_consecutive_asc_desc:16", "v25_two_consecutive_asc_desc:87", "v25_three_consecutive_asc_desc:49"],
  26: ["v26_blue_lt_3:92", "v26_yellow_lt_3:29", "v26_purple_lt_3:31"],
  27: ["v27_blue_lt_4:38", "v27_yellow_lt_4:77", "v27_purple_lt_4:94"],
  28: ["v28_blue_eq_1:46", "v28_yellow_eq_1:61", "v28_purple_eq_1:7"],
  29: ["v29_blue_eq_3:34", "v29_yellow_eq_3:41", "v29_purple_eq_3:54"],
  30: ["v30_blue_eq_4:68", "v30_yellow_eq_4:39", "v30_purple_eq_4:1"],
  31: ["v31_blue_gt_1:73", "v31_yellow_gt_1:35", "v31_purple_gt_1:36"],
  32: ["v32_blue_gt_3:37", "v32_yellow_gt_3:22", "v32_purple_gt_3:42"],
  33: ["v33_blue_even:89", "v33_blue_odd:59", "v33_yellow_even:44", "v33_yellow_odd:52", "v33_purple_even:32", "v33_purple_odd:74"],
  34: ["v34_blue_le_yellow_purple:70", "v34_yellow_le_blue_purple:58", "v34_purple_le_blue_yellow:43"],
  35: ["v35_blue_ge_yellow_purple:76", "v35_yellow_ge_blue_purple:90", "v35_purple_ge_blue_yellow"],
  36: ["v36_sum_is_multiple_of_3:60", "v36_sum_is_multiple_of_4:13", "v36_sum_is_multiple_of_5:55"],
  37: ["v37_blue_plus_yellow_eq_4:81", "v37_yellow_plus_purple_eq_4:30", "v37_blue_plus_purple_eq_4:5"],
  38: ["v38_blue_plus_yellow_eq_6:88", "v38_yellow_plus_purple_eq_6:10", "v38_blue_plus_purple_eq_6:64"],
  39: ["v39_blue_eq_1:46", "v39_blue_gt_1:73", "v39_yellow_eq_1:61", "v39_yellow_gt_1:35", "v39_purple_eq_1:7", "v39_purple_gt_1:36"],
  40: ["v40_blue_lt_3:92", "v40_blue_eq_3:34", "v40_blue_gt_3:37", "v40_yellow_lt_3:29", "v40_yellow_eq_3:41", "v40_yellow_gt_3:22", "v40_purple_lt_3:31", "v40_purple_eq_3:54", "v40_purple_gt_3:42"],
  41: ["v41_blue_lt_4:38", "v41_blue_eq_4:68", "v41_blue_gt_4:82", "v41_yellow_lt_4:77", "v41_yellow_eq_4:39", "v41_yellow_gt_4:79", "v41_purple_lt_4:94", "v41_purple_eq_4:1", "v41_purple_gt_4:83"],
  42: ["v42_blue_lt_yellow_purple:63", "v42_yellow_lt_blue_purple:14", "v42_purple_lt_blue_yellow:18", "v42_blue_gt_yellow_purple:75", "v42_yellow_gt_blue_purple:19", "v42_purple_gt_blue_yellow:65"],
  43: ["v43_blue_lt_yellow:57", "v43_blue_eq_yellow:85", "v43_blue_gt_yellow:84", "v43_blue_lt_purple:66", "v43_blue_eq_purple:8", "v43_blue_gt_purple:80"],
  44: ["v44_blue_gt_yellow:84", "v44_blue_eq_yellow:85", "v44_blue_lt_yellow:57", "v44_yellow_lt_purple:95", "v44_yellow_eq_purple:91", "v44_yellow_gt_purple:69"],
  45: ["v45_no_one:2", "v45_one_one:24", "v45_two_ones:40", "v45_three_ones", "v45_no_three:72", "v45_one_three:93", "v45_two_threes:3", "v45_three_threes"],
  46: ["v46_no_three:72", "v46_one_three:93", "v46_two_threes:3", "v46_three_threes", "v46_no_fours:27", "v46_one_four:28", "v46_two_fours:56", "v46_three_fours"],
  47: ["v47_no_one:2", "v47_one_one:24", "v47_two_ones:40", "v47_three_ones", "v47_no_fours:27", "v47_one_four:28", "v47_two_fours:56", "v47_three_fours"],
  48: ["v48_blue_lt_yellow:57", "v48_blue_eq_yellow:85", "v48_blue_gt_yellow:84", "v48_blue_lt_purple:66", "v48_blue_eq_purple:8", "v48_blue_gt_purple:80", "v48_yellow_lt_purple:95", "v48_yellow_eq_purple:91", "v48_yellow_gt_purple:69"]
};

const PARSED_VERIFIERS = Object.fromEntries(
  Object.entries(VERIFIERS).map(([number, entries]) => [
    Number(number),
    entries.map((entry) => {
      const [name, checkcard] = entry.split(":");
      return { name, checkcard: checkcard ? Number(checkcard) : null, predicate: predicateFor(name) };
    })
  ])
);

const ALL_CODES = [];
for (let blue = 1; blue <= 5; blue += 1) {
  for (let yellow = 1; yellow <= 5; yellow += 1) {
    for (let purple = 1; purple <= 5; purple += 1) {
      ALL_CODES.push({ blue, yellow, purple, value: `${blue}${yellow}${purple}` });
    }
  }
}

const els = {
  form: document.querySelector("#challenge-form"),
  range: document.querySelector("#verifier-range"),
  count: document.querySelector("#verifier-count"),
  decrease: document.querySelector("#decrease-verifiers"),
  increase: document.querySelector("#increase-verifiers"),
  verifierSelect: document.querySelector("#verifier-select"),
  addVerifier: document.querySelector("#add-verifier"),
  forcedVerifiers: document.querySelector("#forced-verifiers"),
  title: document.querySelector("#challenge-title"),
  symbolBadge: document.querySelector("#symbol-badge"),
  list: document.querySelector("#verifier-list"),
  showSolution: document.querySelector("#show-solution"),
  solutionPanel: document.querySelector("#solution-panel"),
  solutionCode: document.querySelector("#solution-code"),
  criteriaList: document.querySelector("#criteria-list"),
  status: document.querySelector("#status-line")
};

let currentGame = null;
let forcedVerifiers = [];

function predicateFor(name) {
  const rule = name.replace(/^v\d+_/, "");
  return (code) => evaluateRule(rule, code);
}

function evaluateRule(rule, code) {
  const digits = [code.blue, code.yellow, code.purple];
  const codeText = code.value;

  if (rule === "ascending") return code.blue < code.yellow && code.yellow < code.purple;
  if (rule === "descending") return code.blue > code.yellow && code.yellow > code.purple;
  if (rule === "no_order") return !evaluateRule("ascending", code) && !evaluateRule("descending", code);
  if (rule === "sum_even") return sum(digits) % 2 === 0;
  if (rule === "sum_odd") return sum(digits) % 2 === 1;
  if (rule === "no_repeat") return new Set(digits).size === 3;
  if (rule === "one_double") return new Set(digits).size === 2;
  if (rule === "one_triple") return new Set(digits).size === 1;
  if (rule === "no_twin") return new Set(digits).size !== 2;
  if (rule === "one_twin") return new Set(digits).size === 2;

  if (rule === "evens_gt_odds") return countEvens(digits) > countOdds(digits);
  if (rule === "evens_lt_odds") return countEvens(digits) < countOdds(digits);
  if (rule === "no_evens") return countEvens(digits) === 0;
  if (rule === "one_even") return countEvens(digits) === 1;
  if (rule === "two_evens") return countEvens(digits) === 2;
  if (rule === "three_evens") return countEvens(digits) === 3;

  if (rule === "no_consecutive_asc") return consecutiveMarks(code).every((mark) => mark !== 5);
  if (rule === "two_consecutive_asc") return consecutiveMarks(code).filter((mark) => mark === 5).length === 1;
  if (rule === "three_consecutive_asc") return consecutiveMarks(code).every((mark) => mark === 5);
  if (rule === "no_consecutive_asc_desc") return consecutiveMarks(code).every((mark) => mark !== 3 && mark !== 5);
  if (rule === "two_consecutive_asc_desc") return consecutiveMarks(code).filter((mark) => mark === 3 || mark === 5).length === 1;
  if (rule === "three_consecutive_asc_desc") {
    const marks = consecutiveMarks(code);
    return (marks[0] === 3 && marks[1] === 3) || (marks[0] === 5 && marks[1] === 5);
  }

  let match = rule.match(/^sum_(lt|eq|gt)_(\d+)$/);
  if (match) return compare(sum(digits), match[1], Number(match[2]));

  match = rule.match(/^sum_is_multiple_of_(\d+)$/);
  if (match) return sum(digits) % Number(match[1]) === 0;

  match = rule.match(/^(blue|yellow|purple)_plus_(blue|yellow|purple)_(lt|eq|gt)_(\d+)$/);
  if (match) return compare(code[match[1]] + code[match[2]], match[3], Number(match[4]));

  match = rule.match(/^(blue|yellow|purple)_(even|odd)$/);
  if (match) return match[2] === "even" ? code[match[1]] % 2 === 0 : code[match[1]] % 2 === 1;

  match = rule.match(/^(blue|yellow|purple)_(lt|eq|gt|le|ge)_(\d+)$/);
  if (match) return compare(code[match[1]], match[2], Number(match[3]));

  match = rule.match(/^(blue|yellow|purple)_(lt|eq|gt)_(blue|yellow|purple)$/);
  if (match) return compare(code[match[1]], match[2], code[match[3]]);

  match = rule.match(/^(blue|yellow|purple)_(lt|gt|le|ge)_(blue|yellow|purple)_(blue|yellow|purple)$/);
  if (match) return compare(code[match[1]], match[2], code[match[3]]) && compare(code[match[1]], match[2], code[match[4]]);

  match = rule.match(/^(no|one|two|three)_(one|ones|three|threes|four|fours)$/);
  if (match) {
    const wanted = { one: 1, ones: 1, three: 3, threes: 3, four: 4, fours: 4 }[match[2]];
    const amount = { no: 0, one: 1, two: 2, three: 3 }[match[1]];
    return countChar(codeText, String(wanted)) === amount;
  }

  throw new Error(`Unknown verifier rule: ${rule}`);
}

function compare(left, op, right) {
  if (op === "lt") return left < right;
  if (op === "eq") return left === right;
  if (op === "gt") return left > right;
  if (op === "le") return left <= right;
  if (op === "ge") return left >= right;
  return false;
}

function countChar(value, char) {
  return [...value].filter((part) => part === char).length;
}

function countEvens(digits) {
  return digits.filter((digit) => digit === 2 || digit === 4).length;
}

function countOdds(digits) {
  return digits.filter((digit) => digit === 1 || digit === 3 || digit === 5).length;
}

function consecutiveMarks(code) {
  return [4 + code.yellow - code.blue, 4 + code.purple - code.yellow];
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function generateGame(nbVerif, difficultyName, includeVerifiers = []) {
  const difficulty = DIFFICULTIES[difficultyName];
  const baseVerifiers = [...new Set(includeVerifiers)].sort((a, b) => a - b);

  if (baseVerifiers.some((verifier) => verifier < 1 || verifier > difficulty.maxVerifier)) {
    throw new Error(`${difficulty.label}-tasolla tarkistimet ovat välillä 1-${difficulty.maxVerifier}.`);
  }

  if (baseVerifiers.length > nbVerif) {
    throw new Error("Pakotettuja tarkistimia on enemmän kuin valittu määrä.");
  }

  for (let tries = 1; tries <= 10000; tries += 1) {
    const verifiers = [...baseVerifiers];
    let firstPick = true;

    while (verifiers.length < nbVerif) {
      let min = 1;
      if (firstPick && difficultyName === "STANDARD") min = DIFFICULTIES.EASY.maxVerifier + 1;
      if (firstPick && difficultyName === "HARD") min = DIFFICULTIES.STANDARD.maxVerifier + 1;

      let candidate = randomInt(min, difficulty.maxVerifier);
      while (verifiers.includes(candidate)) {
        candidate = randomInt(min, difficulty.maxVerifier);
      }
      verifiers.push(candidate);
      firstPick = false;
    }

    verifiers.sort((a, b) => a - b);
    const criteria = verifiers.map((verifier) => randomCheckableCriterion(PARSED_VERIFIERS[verifier]));
    const code = testCriteria(criteria.map((criterion) => criterion.predicate));

    if (code) {
      const solutions = findAllSolutions(verifiers);
      if (Object.keys(solutions).length !== 1) {
        return { tries, verifiers, criteria, code };
      }
    }
  }

  throw new Error("Sopivaa haastetta ei löytynyt 10000 yrityksellä.");
}

function randomCheckableCriterion(criteria) {
  const available = criteria.filter((criterion) => criterion.checkcard !== null);
  return available[randomInt(0, available.length - 1)];
}

function testCriteria(predicates) {
  const matches = oneSolution(predicates);
  if (!matches) return null;

  for (const subset of properSubsets(predicates)) {
    if (oneSolution(subset)) return null;
  }
  return matches;
}

function oneSolution(predicates) {
  const matches = ALL_CODES.filter((code) => predicates.every((predicate) => predicate(code)));
  return matches.length === 1 ? matches[0] : null;
}

function properSubsets(items) {
  const subsets = [];
  const maxMask = 1 << items.length;
  for (let mask = 0; mask < maxMask; mask += 1) {
    const subset = [];
    for (let index = 0; index < items.length; index += 1) {
      if (mask & (1 << index)) subset.push(items[index]);
    }
    if (subset.length >= 2 && subset.length < items.length) subsets.push(subset);
  }
  return subsets;
}

function findAllSolutions(verifiers) {
  const solutions = {};
  for (const criteria of product(verifiers.map((verifier) => PARSED_VERIFIERS[verifier]))) {
    const code = testCriteria(criteria.map((criterion) => criterion.predicate));
    if (code) {
      solutions[code.value] = solutions[code.value] || [];
      solutions[code.value].push(criteria);
    }
  }
  return solutions;
}

function product(groups) {
  return groups.reduce((acc, group) => {
    const next = [];
    for (const prefix of acc) {
      for (const item of group) next.push([...prefix, item]);
    }
    return next;
  }, [[]]);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderGame(game, difficultyName) {
  currentGame = game;
  const symbol = SYMBOLS[randomInt(0, SYMBOLS.length - 1)];
  els.title.textContent = `${DIFFICULTIES[difficultyName].label} / ${game.verifiers.length}`;
  els.symbolBadge.className = `symbol-badge ${symbol}`;
  els.symbolBadge.textContent = SYMBOL_LABELS[symbol];
  els.list.dataset.count = String(game.verifiers.length);
  els.list.replaceChildren(...game.verifiers.map((verifier, index) => renderVerifierCard(verifier, game.criteria[index], symbol, index)));
  els.solutionPanel.hidden = true;
  els.showSolution.disabled = false;
  els.status.textContent = `Löytyi ${game.tries} yrityksellä.`;
}

function renderVerifierCard(verifier, criterion, symbol, index) {
  const item = document.createElement("li");
  item.className = "verifier-card";
  item.dataset.symbol = symbol;
  item.tabIndex = 0;
  item.role = "button";
  item.setAttribute("aria-label", `Näytä tarkistimen ${String.fromCharCode(65 + index)} vaihtoehdot`);

  const verifierNumber = document.createElement("span");
  verifierNumber.className = "verifier-number";
  verifierNumber.textContent = verifier;

  const checkRow = document.createElement("div");
  checkRow.className = "check-card";

  const checkNumber = document.createElement("span");
  checkNumber.className = "check-number";
  checkNumber.textContent = CHECK_CARDS[criterion.checkcard][symbol];

  const checkSymbol = document.createElement("span");
  checkSymbol.className = "check-symbol";
  checkSymbol.textContent = SYMBOL_LABELS[symbol];

  checkRow.append(checkNumber, checkSymbol);
  item.append(verifierNumber, checkRow);
  item.addEventListener("click", () => showCriterion(verifier, criterion, index));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showCriterion(verifier, criterion, index);
    }
  });
  return item;
}

function showCriterion(verifier, criterion, index) {
  const letter = String.fromCharCode(65 + index);
  els.status.replaceChildren(
    document.createTextNode(`${letter} / Tarkistin ${verifier}: `),
    ...PARSED_VERIFIERS[verifier].flatMap((item, optionIndex) => {
      const parts = renderCriterionDescription(describeCriterion(item.name));
      return optionIndex === 0 ? parts : [document.createTextNode(" | "), ...parts];
    })
  );
}

function describeCriterion(name) {
  const rule = name.replace(/^v\d+_/, "");

  const staticDescriptions = {
    ascending: "koodi on nouseva",
    descending: "koodi on laskeva",
    no_order: "koodi ei ole nouseva eikä laskeva",
    sum_even: "summa on parillinen",
    sum_odd: "summa on pariton",
    no_repeat: "kaikki numerot ovat eri",
    one_double: "yksi pari",
    one_triple: "kolme samaa",
    no_twin: "ei paria",
    one_twin: "yksi pari",
    evens_gt_odds: "parillisia on enemmän kuin parittomia",
    evens_lt_odds: "parillisia on vähemmän kuin parittomia",
    no_evens: "ei parillisia numeroita",
    one_even: "yksi parillinen numero",
    two_evens: "kaksi parillista numeroa",
    three_evens: "kolme parillista numeroa",
    no_consecutive_asc: "ei nousevia peräkkäislukuja",
    two_consecutive_asc: "2 nousevaa peräkkäislukua",
    three_consecutive_asc: "3 nousevaa peräkkäislukua",
    no_consecutive_asc_desc: "ei nousevaa tai laskevaa peräkkäislukujonoa",
    two_consecutive_asc_desc: "2 nousevaa tai laskevaa peräkkäislukua",
    three_consecutive_asc_desc: "3 nousevaa tai laskevaa peräkkäislukua"
  };
  if (staticDescriptions[rule]) return staticDescriptions[rule];

  let match = rule.match(/^sum_(lt|eq|gt)_(\d+)$/);
  if (match) return `summa ${shortCompare(match[1])} ${match[2]}`;

  match = rule.match(/^sum_is_multiple_of_(\d+)$/);
  if (match) return `summa on jaollinen ${match[1]}:lla`;

  match = rule.match(/^(blue|yellow|purple)_plus_(blue|yellow|purple)_(lt|eq|gt)_(\d+)$/);
  if (match) return `${colorName(match[1])} + ${colorName(match[2])} ${shortCompare(match[3])} ${match[4]}`;

  match = rule.match(/^(blue|yellow|purple)_(even|odd)$/);
  if (match) return `${colorName(match[1])} on ${match[2] === "even" ? "parillinen" : "pariton"}`;

  match = rule.match(/^(blue|yellow|purple)_(lt|eq|gt)_(\d+)$/);
  if (match) return `${colorName(match[1])} ${shortCompare(match[2])} ${match[3]}`;

  match = rule.match(/^(blue|yellow|purple)_(lt|eq|gt)_(blue|yellow|purple)$/);
  if (match) return `${colorName(match[1])} ${COMPARE_WORDS[match[2]]} ${colorName(match[3])}`;

  match = rule.match(/^(blue|yellow|purple)_(lt|gt)_(blue|yellow|purple)_(blue|yellow|purple)$/);
  if (match) return `${colorName(match[1])} on ${match[2] === "lt" ? "pienin" : "suurin"}`;

  match = rule.match(/^(blue|yellow|purple)_(le|ge)_(blue|yellow|purple)_(blue|yellow|purple)$/);
  if (match) return `${colorName(match[1])} ${COMPARE_WORDS[match[2]]}`;

  match = rule.match(/^(no|one|two|three)_(one|ones|three|threes|four|fours)$/);
  if (match) {
    const amount = { no: "ei yhtään", one: "yksi", two: "kaksi", three: "kolme" }[match[1]];
    const digit = { one: "1", ones: "1", three: "3", threes: "3", four: "4", fours: "4" }[match[2]];
    const numberWord = match[1] === "one" ? "numero" : "numeroa";
    return `${amount} ${numberWord} ${digit}`;
  }

  return rule.replaceAll("_", " ");
}

function colorName(color) {
  return COLOR_NAMES[color] || color;
}

function shortCompare(op) {
  return { lt: "<", eq: "=", gt: ">" }[op] || op;
}

function renderCriterionDescription(description) {
  return description.split(/(sininen|keltainen|violetti)/g).filter(Boolean).map((part) => {
    const color = Object.entries(COLOR_NAMES).find(([, label]) => label === part)?.[0];
    if (!color) return document.createTextNode(part);

    const icon = document.createElement("span");
    icon.className = `color-token ${color}`;
    icon.setAttribute("aria-label", part);
    icon.title = part;
    return icon;
  });
}

function createColorToken(color) {
  const label = colorName(color);
  const icon = document.createElement("span");
  icon.className = `color-token ${color}`;
  icon.setAttribute("aria-label", label);
  icon.title = label;
  return icon;
}

function revealSolution() {
  if (!currentGame) return;
  const digits = [
    ["blue", currentGame.code.blue],
    ["yellow", currentGame.code.yellow],
    ["purple", currentGame.code.purple]
  ];
  els.solutionCode.replaceChildren(...digits.map(([color, digit]) => {
    const span = document.createElement("span");
    span.className = `code-digit ${color}`;
    span.append(createColorToken(color), document.createTextNode(String(digit)));
    return span;
  }));
  els.criteriaList.replaceChildren(...currentGame.criteria.map((criterion, index) => {
    const row = document.createElement("span");
    row.className = "criteria-row";
    row.append(
      document.createTextNode(`${String.fromCharCode(65 + index)}: `),
      ...renderCriterionDescription(describeCriterion(criterion.name))
    );
    return row;
  }));
  els.status.textContent = "";
  els.solutionPanel.hidden = false;
}

function setBusy(isBusy) {
  const submit = els.form.querySelector("[type='submit']");
  submit.disabled = isBusy;
  submit.textContent = isBusy ? "Haetaan..." : "Luo haaste";
}

function syncVerifierCount(value) {
  const next = Math.max(4, Math.min(6, Number(value)));
  els.range.value = String(next);
  els.count.value = String(next);
  els.count.textContent = String(next);
  if (forcedVerifiers.length > next) {
    forcedVerifiers = forcedVerifiers.slice(0, next);
    updateVerifierSelect();
  }
}

function currentDifficultyName() {
  return els.form.querySelector("[name='difficulty']:checked").value;
}

function updateVerifierSelect() {
  const maxVerifier = DIFFICULTIES[currentDifficultyName()].maxVerifier;
  const selected = Number(els.verifierSelect.value) || 1;
  els.verifierSelect.replaceChildren(...Array.from({ length: maxVerifier }, (_, index) => {
    const value = index + 1;
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = String(value);
    option.disabled = forcedVerifiers.includes(value);
    return option;
  }));
  els.verifierSelect.value = String(Math.min(selected, maxVerifier));
  forcedVerifiers = forcedVerifiers.filter((verifier) => verifier <= maxVerifier);
  renderForcedVerifiers();
}

function renderForcedVerifiers() {
  els.forcedVerifiers.replaceChildren(...forcedVerifiers.map((verifier) => {
    const chip = document.createElement("button");
    chip.className = "verifier-chip";
    chip.type = "button";
    chip.textContent = String(verifier);
    chip.setAttribute("aria-label", `Poista tarkistin ${verifier}`);
    chip.addEventListener("click", () => {
      forcedVerifiers = forcedVerifiers.filter((item) => item !== verifier);
      updateVerifierSelect();
    });
    return chip;
  }));
  els.addVerifier.disabled = forcedVerifiers.length >= Number(els.range.value);
}

function addForcedVerifier() {
  const verifier = Number(els.verifierSelect.value);
  if (!Number.isInteger(verifier) || forcedVerifiers.includes(verifier)) return;
  if (forcedVerifiers.length >= Number(els.range.value)) return;
  forcedVerifiers = [...forcedVerifiers, verifier].sort((a, b) => a - b);
  updateVerifierSelect();
}

els.range.addEventListener("input", () => syncVerifierCount(els.range.value));
els.decrease.addEventListener("click", () => syncVerifierCount(Number(els.range.value) - 1));
els.increase.addEventListener("click", () => syncVerifierCount(Number(els.range.value) + 1));
els.showSolution.addEventListener("click", revealSolution);
els.addVerifier.addEventListener("click", addForcedVerifier);
els.form.querySelectorAll("[name='difficulty']").forEach((radio) => {
  radio.addEventListener("change", updateVerifierSelect);
});

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  setBusy(true);
  els.status.textContent = "Haetaan haastetta...";
  els.solutionPanel.hidden = true;

  window.setTimeout(() => {
    try {
      const formData = new FormData(els.form);
      const nbVerif = Number(formData.get("nbVerif"));
      const difficulty = formData.get("difficulty");
      renderGame(generateGame(nbVerif, difficulty, forcedVerifiers), difficulty);
    } catch (error) {
      els.status.textContent = error.message;
      els.showSolution.disabled = true;
    } finally {
      setBusy(false);
    }
  }, 20);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

syncVerifierCount(4);
updateVerifierSelect();
