Surfaces.prototype.sphera = (count = 20, R = 6, point = new Point(0, 0, 0), color ='00FFA0', animation = null) => {
    const points = [];
    const edges = [];
    const polygons = [];


    //print points
    const delta = Math.PI * 2 / count;
    for (let i = 0; i <= Math.PI; i += delta) {
        for (let j = 0; j < Math.PI * 2; j += delta) {
            const x = point.x + R * Math.sin(i) * Math.cos(j)
            const y = point.y + R * Math.sin(i) * Math.sin(j)
            const z = point.z + R * Math.cos(i);

            points.push(new Point(x, y, z))

        }
    }

    //print edges

    for (let i = 0; i < points.length; i++) {
        //vdol'
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i, i + 1 - count));
        }
        //poperek
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count));
        }

    }

    //print polygons
    let sec = 0;
    let j = 0;
    let hole = 0;  //смена цвета полигона
    for (let i = 0; i < points.length; i++) {
        j++;
        if (j === count){
            sec++;
            j = 0;
            color = `${sec}0FC${count/2-sec}0`; 
           
            //console.log(color[0]);
        }
     
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));

        } else if ((i + 1) % count === 0 && i + count < points.length) {
           hole++
           if(hole === 10){
            hole = 9;
            }
           color = `${hole}0FC${count/2-hole}0`;
           polygons.push(new Polygon([i, i + 1 - count, i  + 1, i + count], color));
        }
    }

    return new Subject(points, edges, polygons, animation);
}