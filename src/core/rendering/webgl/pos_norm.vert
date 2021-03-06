#version 300 es

precision mediump float;

uniform mat4 mat_projection;
uniform mat4 mat_model_view;
uniform mat3 mat_normal;

in vec4 pos;
in vec3 normal;

out vec3 frag_normal;

void main() {
    gl_Position = mat_projection * mat_model_view * pos;
    frag_normal = normalize(mat_normal * normal);
}
