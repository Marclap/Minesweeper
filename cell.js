class Cell {
    constructor(i, j, w) {
        this.i = i
        this.j = j
        this.x = i * w
        this.y = j * w
        this.w = w
        this.bee = false
        this.revealed = false
        this.neighborCount = 0
    }
    show() {
        stroke(0)
        noFill()
        rect(this.x, this.y, this.w, this.w)
        if (this.revealed) {
            if (this.bee) {
                fill(179, 57, 57)
                ellipse(
                    this.x + this.w * 0.5,
                    this.y + this.w * 0.5,
                    this.w * 0.5
                )
            } else {
                fill(132, 129, 122)
                rect(this.x, this.y, this.w, this.w)
                if (this.neighborCount > 0) {
                    textAlign(CENTER)
                    textSize(25)
                    switch (this.neighborCount) {
                        case 1:
                            fill(0, 18, 25)
                            break
                        case 2:
                            fill(0, 95, 115)
                            break
                        case 3:
                            fill(148, 210, 189)
                            break
                        case 4:
                            fill(233, 216, 166)
                            break
                        case 5:
                            fill(238, 155, 0)
                            break
                        case 6:
                            fill(202, 103, 2)
                            break
                        case 7:
                            fill(187, 62, 3)
                            break
                        case 8:
                            fill(174, 32, 18)
                            break
                    }
                    noStroke()
                    text(
                        this.neighborCount,
                        this.x + this.w * 0.5,
                        this.y + this.w - 12
                    )
                }
            }
        }
    }
    contains(x, y) {
        return (
            x > this.x &&
            x < this.x + this.w &&
            y > this.y &&
            y < this.y + this.w
        )
    }
    reveal() {
        this.revealed = true
        if (this.neighborCount == 0) {
            this.floodFill()
        }
    }
    countBees() {
        if (this.bee) {
            this.neighborCount = -1
            return
        }
        var total = 0
        for (var xoff = -1; xoff <= 1; xoff++) {
            for (var yoff = -1; yoff <= 1; yoff++) {
                var i = this.i + xoff
                var j = this.j + yoff
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    var neighbor = grid[i][j]
                    if (neighbor.bee) total++
                }
            }
        }
        this.neighborCount = total
    }
    floodFill() {
        for (var xoff = -1; xoff <= 1; xoff++) {
            for (var yoff = -1; yoff <= 1; yoff++) {
                var i = this.i + xoff
                var j = this.j + yoff
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    var neighbor = grid[i][j]
                    if (!neighbor.bee && !neighbor.revealed) neighbor.reveal()
                }
            }
        }
    }
}
