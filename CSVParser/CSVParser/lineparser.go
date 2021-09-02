package main

import (
	"bufio"
	"fmt"
)

type LineParser struct {
	scanner    **bufio.Scanner
	lineNumber **int
}

func (p *LineParser) getLine(expected string) (string, error) {
	**p.lineNumber += 1
	read := (*p.scanner).Scan()
	if !read {
		return "", fmt.Errorf("expected %s on line: %d, recieved either error or eof", expected, **p.lineNumber)
	}
	return (*p.scanner).Text(), nil
}
