#version 300 es

precision mediump float;

uniform mat4 mat_projection;
uniform mat4 mat_camera;

in vec4 pos;
in vec2 tex;

out vec2 f_tex;

void main() {
    gl_Position = mat_projection * mat_camera * pos;
    f_tex = tex;
}
