const VF = Vex.Flow;

document.getElementById("generate").addEventListener("click", () => {
    const clef = document.getElementById("clef").value;
    const key = document.getElementById("key").value;
    const time = document.getElementById("time").value;

    generateMusic(clef, key, time);
});

function generateMusic(clef, key, time) {
    const div = document.getElementById("notation");
    div.innerHTML = ""; // Clear previous notation

    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(600, 200);
    const context = renderer.getContext();

    const stave = new VF.Stave(10, 40, 550);
    stave.addClef(clef);
    stave.addKeySignature(key);
    stave.addTimeSignature(time);
    stave.setContext(context).draw();

    // Simple random notes for now
    const notes = [
        new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
        new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
        new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
        new VF.StaveNote({ keys: ["f/4"], duration: "q" })
    ];

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 500);
    voice.draw(context, stave);
}
