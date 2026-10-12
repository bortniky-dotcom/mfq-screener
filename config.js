(function () {
  function sc(lo, mid, hi) { return [1, 2, 3, 4, 5, 6, 7].map(function (v) { return { v: v, l: v === 1 ? lo : v === 4 ? mid : v === 7 ? hi : "" }; }); }
  var FREQ = ["names","faces","appointments","where you put things (e.g., keys)","performing household chores","directions to places","phone numbers you've just checked","phone numbers you use frequently","things people tell you","keeping up correspondence","personal dates (e.g., birthdays)","words","going to the store and forgetting what you wanted to buy","taking a test","beginning to do something and forgetting what you were doing","losing the thread of thought in conversation","losing the thread of thought in public speaking","knowing whether you've already told someone something"];
  var SER = ["names","faces","appointments","where you put things (e.g. keys)","performing household chores","directions to places","phone numbers you've just checked","phone numbers used frequently","things people tell you","keeping up correspondence","personal dates (e.g. birthdays)","words","going to the store and forgetting what you wanted to buy","taking a test","beginning to do something and forgetting what you were doing","losing the thread of thought in conversation","losing the thread of thought in public speaking","knowing whether you've already told someone something"];
  var S = [
    ["g", "GENERAL RATING SCALE", "1. How would you rate your memory in terms of the kinds of problems that you have?", ["How would you rate your memory in terms of the kinds of problems that you have?"], sc("major problems", "some minor problems", "no problems"), "1"],
    ["r", "RETROSPECTIVE FUNCTIONING SCALE", "2. How is your memory compared to the way it was . . .", ["one year ago?","five years ago?","ten years ago?","twenty years ago?","when you were eighteen?"], sc("much worse", "same", "much better"), "2"],
    ["f", "FREQUENCY OF FORGETTING SCALE", "3. How often do these present a problem for you?", FREQ, sc("always", "sometimes", "never"), "3"],
    ["n", "FREQUENCY OF FORGETTING DURING READING SCALE", "4. As you are reading a novel, how often do you have trouble remembering what you have read . . .", ["in the opening chapters, once you have finished the book","three or four chapters before the one you are currently reading","the chapter before the one you are currently reading","the paragraph just before the one you are currently reading","the sentence before the one you are currently reading"], sc("always", "sometimes", "never"), "4"],
    ["m", "FREQUENCY OF FORGETTING DURING READING SCALE (continued)", "5. When you are reading a newspaper or magazine article, how often do you have trouble remembering what you have read . . .", ["in the opening paragraphs, once you have finished the article","three or four paragraphs before the one you are currently reading","the paragraph before the one you are currently reading","three or four sentences before the one you are currently reading","the sentence before the one you are currently reading"], sc("always", "sometimes", "never"), "5"],
    ["p", "REMEMBERING PAST EVENTS SCALE", "6. How well you remember things which occurred . . .", ["last month is","between six months and one year ago is","between one and five years ago is","between six and ten years ago is"], sc("very bad", "fair", "very good"), "6"],
    ["s", "SERIOUSNESS SCALE", "7. When you actually forget in these situations, how serious of a problem do you consider the memory failure to be? . . .", SER, sc("very serious", "somewhat serious", "not serious"), "7"],
    ["u", "MNEMONICS USAGE SCALE", "8. How often do you use these techniques to remind yourself about things? . . .", ["keep an appointment book","write yourself reminder notes","make lists of things to do","make grocery lists","plan your daily schedule in advance","mental repetition","associations with other things","keep things you need to do in a prominent place where you will notice them"], sc("always", "sometimes", "never"), "8"]
  ];
  window.CFG = {
    slug: "mfq", short: "MFQ", sub: "Memory Functioning Questionnaire",
    intro: "This is a questionnaire about how you remember information. There are no right or wrong answers. Choose a number between 1 and 7 that best reflects your judgment about your memory. Think carefully about your responses, and try to be as realistic as possible when you make them. Please answer all questions.",
    sections: S.map(function (s) { return { id: s[0], title: s[1], note: s[2], items: s[3].map(function (t, i) { return { id: s[0] + (i + 1), num: s[5] + (s[3].length > 1 ? String.fromCharCode(97 + i) : "") + ".", text: t, opts: s[4] }; }) }; }),
    scoringHint: '<p class="hint">Each item is rated 1 to 7. The source form prints no scoring rules, cut-offs or bands. Per-scale raw sums and means are shown for the clinician. On every scale except Mnemonics Usage, higher numbers mean fewer memory problems; on Mnemonics Usage, higher numbers mean less use of reminder techniques.</p>',
    footer: "MFQ · Gilewski and Zelinski, Psychopharmacol Bull 1988",
    score: function (A, H) {
      var rows = [], inc = false;
      var groups = [["General rating (item 1)", ["g"]], ["Retrospective functioning (2a-e)", ["r"]], ["Frequency of forgetting (3a-r)", ["f"]], ["Frequency of forgetting while reading (4a-e, 5a-e)", ["n", "m"]], ["Remembering past events (6a-d)", ["p"]], ["Seriousness (7a-r)", ["s"]], ["Mnemonics usage (8a-h)", ["u"]]];
      groups.forEach(function (g) {
        var ii = []; S.forEach(function (s) { if (g[1].indexOf(s[0]) >= 0) s[3].forEach(function (_, i) { ii.push(s[0] + (i + 1)); }); });
        var t = H.sum(A, ii);
        if (t === null) { inc = true; rows.push([g[0], "Incomplete, not scored (" + H.missing(A, ii).length + " blank)"]); }
        else rows.push([g[0], "sum " + t + " of " + ii.length * 7 + ", mean " + (Math.round(t / ii.length * 100) / 100)]);
      });
      return { incomplete: inc, rows: rows };
    }
  };
})();
