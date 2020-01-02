(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"0Xme":function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i("sDu+"),s=i("jJhE"),r=(i("x1yY"),i("4VsB")),o=i("FXpb");class a extends n.a{constructor(e,t,i,n,s){super(s),this.element=Object(o.r)({className:`${t} core_Input`}),this._value=new r.a(this,e,this.set_value),this.value=this._value,this.input_element=Object(o.m)({className:`${n} core_Input_inner`}),this.input_element.type=i,this.input_element.addEventListener("change",()=>{this._value.set_val(this.get_value(),{silent:!1})}),s&&s.readonly&&this.set_attr("readOnly",!0),this.element.append(this.input_element)}set_enabled(e){super.set_enabled(e),this.input_element.disabled=!e}set_attr(e,t,i){if(null==t)return;const n=this.input_element,r=i||(e=>e);Object(s.a)(t)?(n[e]=r(t.val),this.disposable(t.observe(({value:t})=>n[e]=r(t)))):n[e]=r(t)}}},"488w":function(e,t,i){"use strict";i.d(t,"b",(function(){return d})),i.d(t,"a",(function(){return _}));var n=i("Womt"),s=i("tRdk"),r=i("kwt4"),o=i("vM2b");const a=new n.Vector3(0,1,0),c=new n.Vector2(0,0),u=new n.Vector3(0,0,0),l=new n.Quaternion(0,0,0,1),h=new n.Vector3(1,1,1);function d(e,t){new f(t).to_geometry_builder(e)}function _(e){return new f(new o.a).create_buffer_geometry(e)}class p{constructor(){this.vertices_stack=[]}put(e){this.vertices_stack.push(e)}get(e){const t=[];for(let i=this.vertices_stack.length-1;i>=0;i--){const n=this.vertices_stack[i][e];n&&t.push(n)}return t}}class f{constructor(e){this.vertices=new p,this.bone_id=0,this.builder=e}to_geometry_builder(e){this.object_to_geometry(e,void 0,new n.Matrix4)}create_buffer_geometry(e){return this.to_geometry_builder(e),this.builder.build()}object_to_geometry(e,t,i){const{no_translate:r,no_rotate:o,no_scale:a,hidden:c,break_child_trace:d,zxy_rotation_order:_,skip:p}=e.evaluation_flags,{position:f,rotation:b,scale:m}=e,g=new n.Euler(b.x,b.y,b.z,_?"ZXY":"ZYX"),w=(new n.Matrix4).compose(r?u:Object(s.a)(f),o?l:(new n.Quaternion).setFromEuler(g),a?h:Object(s.a)(m)).premultiply(i);let v;if(p?v=t:(v=new n.Bone,v.name=this.bone_id.toString(),v.position.set(f.x,f.y,f.z),v.setRotationFromEuler(g),v.scale.set(m.x,m.y,m.z),this.builder.add_bone(v),t&&t.add(v)),e.model&&!c&&this.model_to_geometry(e.model,w),this.bone_id++,!d)for(const t of e.children)this.object_to_geometry(t,v,w)}model_to_geometry(e,t){Object(r.b)(e)?this.njcm_model_to_geometry(e,t):this.xj_model_to_geometry(e,t)}njcm_model_to_geometry(e,t){const i=(new n.Matrix3).getNormalMatrix(t),r=e.vertices.map(e=>{const r=Object(s.a)(e.position),o=e.normal?Object(s.a)(e.normal):new n.Vector3(0,1,0);return r.applyMatrix4(t),o.applyMatrix3(i),{bone_id:this.bone_id,position:r,normal:o,bone_weight:e.bone_weight,bone_weight_status:e.bone_weight_status,calc_continue:e.calc_continue}});this.vertices.put(r);for(const t of e.meshes){const e=this.builder.index_count;for(let e=0;e<t.vertices.length;++e){const i=t.vertices[e],n=this.vertices.get(i.index);if(n.length){const s=n[0],r=s.normal||i.normal||a,o=this.builder.vertex_count;this.builder.add_vertex(s.position,r,t.has_tex_coords?i.tex_coords:c),e>=2&&(e%2==(t.clockwise_winding?1:0)?(this.builder.add_index(o-2),this.builder.add_index(o-1),this.builder.add_index(o)):(this.builder.add_index(o-2),this.builder.add_index(o),this.builder.add_index(o-1)));const u=[[0,0],[0,0],[0,0],[0,0]];for(let e=n.length-1;e>=0;e--){const t=n[e];u[t.bone_weight_status]=[t.bone_id,t.bone_weight]}for(const[e,t]of u)this.builder.add_bone_weight(e,t)}}this.builder.add_group(e,this.builder.index_count-e,t.texture_id)}}xj_model_to_geometry(e,t){const i=this.builder.vertex_count,r=(new n.Matrix3).getNormalMatrix(t);for(const{position:i,normal:o,uv:a}of e.vertices){const e=Object(s.a)(i).applyMatrix4(t),u=(o?Object(s.a)(o):new n.Vector3(0,1,0)).applyMatrix3(r),l=a||c;this.builder.add_vertex(e,u,l)}let o;for(const t of e.meshes){const e=this.builder.index_count;let n=!1;for(let e=2;e<t.indices.length;++e){const s=i+t.indices[e-2],r=i+t.indices[e-1],o=i+t.indices[e],a=this.builder.get_position(s),c=this.builder.get_position(r),u=this.builder.get_position(o),l=this.builder.get_normal(s),h=this.builder.get_normal(r),d=this.builder.get_normal(o),_=c.clone().sub(a).cross(u.clone().sub(a));n&&_.negate(),(_.dot(l)<0?1:0)+(_.dot(h)<0?1:0)+(_.dot(d)<0?1:0)>=2&&(n=!n),n?(this.builder.add_index(r),this.builder.add_index(s),this.builder.add_index(o)):(this.builder.add_index(s),this.builder.add_index(r),this.builder.add_index(o)),n=!n}null!=t.material_properties.texture_id&&(o=t.material_properties.texture_id),this.builder.add_group(e,this.builder.index_count-e,o)}}}},"6cU9":function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var n=i("FXpb"),s=(i("+Mcu"),i("ouMO")),r=i("QmPX");class o extends r.a{constructor(e,t){super(t),this.element=Object(n.n)({className:"core_FileButton core_Button"}),this.input=Object(n.m)({className:"core_FileButton_input core_Button_inner"}),this._files=Object(s.e)([]),this.files=this._files,this.input.type="file",this.input.onchange=()=>{this.input.files&&this.input.files.length?this._files.val=[...this.input.files]:this._files.val=[]};const i=Object(n.r)({className:"core_FileButton_inner core_Button_inner"});t&&(null!=t.accept&&(this.input.accept=t.accept),null!=t.multiple&&(this.input.multiple=t.multiple),null!=t.icon_left&&i.append(Object(n.r)({className:"core_FileButton_left core_Button_left"},Object(n.k)(t.icon_left)))),i.append(Object(n.r)({className:"core_Button_center"},e)),this.element.append(i,this.input),this.disposables(this.enabled.observe(({value:e})=>{this.input.disabled=!e,e?this.element.classList.remove("disabled"):this.element.classList.add("disabled")})),this.finalize_construction()}click(){this.input.click()}}},"9Ykw":function(e,t,i){"use strict";function n(e){const t=[];for(;e.bytes_left;){const i=e.u32(),n=e.u32();if(n>e.bytes_left)break;t.push({type:i,data:e.take(n)})}return t}i.d(t,"a",(function(){return n}))},Eqai:function(e,t,i){"use strict";i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return c}));var n=i("Womt");const s=new n.MeshLambertMaterial({color:65280,side:n.DoubleSide}),r=new n.MeshLambertMaterial({color:16711935,side:n.DoubleSide}),o=new n.MeshLambertMaterial({skinning:!0,color:16711935,side:n.DoubleSide});function a(e,t,i=r){return u(e,t,i,n.Mesh)}function c(e,t,i=o){return u(e,t,i,n.SkinnedMesh)}function u(e,t,i,r){const{created_by_geometry_builder:o,normalized_material_indices:a,bones:c}=e.userData;let u;if(Array.isArray(t))if(o){u=[s];for(const[e,n]of a.entries())n>0&&(u[n]=t[e]||i)}else u=t;else u=t||i;const l=new r(e,u);return o&&c.length&&l instanceof n.SkinnedMesh&&(l.add(c[0]),l.bind(new n.Skeleton(c))),l}},Ftn7:function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));var n=i("pVCM"),s=i("Womt");n.a.install({THREE:Object.assign(Object.assign({},s),{MOUSE:Object.assign(Object.assign({},s.MOUSE),{LEFT:s.MOUSE.RIGHT,RIGHT:s.MOUSE.LEFT})})});class r{constructor(e){this._debug=!1,this.scene=new s.Scene,this.light_holder=new s.Group,this.render_scheduled=!1,this.animation_frame_handle=void 0,this.light=new s.HemisphereLight(16777215,5263440,1),this.controls_clock=new s.Clock,this.size=new s.Vector2(0,0),this.schedule_render=()=>{this.render_scheduled=!0},this.on_mouse_down=e=>{e.currentTarget&&e.currentTarget.focus()},this.call_render=()=>{const e=this.controls.update(this.controls_clock.getDelta()),t=this.render_scheduled||e;this.render_scheduled=!1,t&&this.render(),this.animation_frame_handle=requestAnimationFrame(this.call_render)},this.renderer=e,this.renderer.domElement.tabIndex=0,this.renderer.domElement.addEventListener("mousedown",this.on_mouse_down),this.renderer.domElement.style.outline="none",this.scene.background=new s.Color(1579032),this.light_holder.add(this.light),this.scene.add(this.light_holder)}get debug(){return this._debug}set debug(e){this._debug=e}get canvas_element(){return this.renderer.domElement}set_size(e,t){this.size.set(e,t),this.renderer.setSize(e,t),this.schedule_render()}pointer_pos_to_device_coords(e){e.set(e.x/this.size.width*2-1,e.y/this.size.height*-2+1)}start_rendering(){this.schedule_render(),this.animation_frame_handle=requestAnimationFrame(this.call_render)}stop_rendering(){null!=this.animation_frame_handle&&(cancelAnimationFrame(this.animation_frame_handle),this.animation_frame_handle=void 0)}reset_camera(e,t){this.controls.setLookAt(e.x,e.y,e.z,t.x,t.y,t.z)}dispose(){this.renderer.dispose(),this.controls.dispose()}init_camera_controls(){this.controls=new n.a(this.camera,this.renderer.domElement),this.controls.dampingFactor=1,this.controls.draggingDampingFactor=1}render(){this.renderer.render(this.scene,this.camera)}}},KUR2:function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));var n=i("nN8q"),s=i("FXpb");class r extends n.a{constructor(e){super(),this.renderer=e,this.element=Object(s.i)({className:"core_RendererWidget"}),this.element.append(e.canvas_element),this.disposable(e),this.finalize_construction()}start_rendering(){this.renderer.start_rendering()}stop_rendering(){this.renderer.stop_rendering()}resize(e,t){return super.resize(e,t),this.renderer.set_size(e,t),this}}},PE7g:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i("0Xme");i("rY5A");class s extends n.a{constructor(e=0,t){if(super(e,"core_NumberInput","number","core_NumberInput_inner",t),this.preferred_label_position="left",t){const{min:e,max:i,step:n,width:s}=t;this.set_attr("min",e,String),this.set_attr("max",i,String),this.input_element.step="any",this.set_attr("step",n,String),null!=s&&(this.element.style.width=`${s}px`)}t&&null!=t.round_to&&t.round_to>=0?this.rounding_factor=Math.pow(10,t.round_to):this.rounding_factor=1,this.set_value(e),this.finalize_construction()}get_value(){return parseFloat(this.input_element.value)}set_value(e){this.input_element.valueAsNumber=Math.round(this.rounding_factor*e)/this.rounding_factor}}},iR5r:function(e,t,i){"use strict";i.d(t,"a",(function(){return s})),i.d(t,"b",(function(){return r}));var n=i("Womt");function s(e){return e.textures.map(r)}function r(e){let t,i;switch(e.format[1]){case 6:t=n.RGBA_S3TC_DXT1_Format,i=e.width*e.height/2;break;case 7:t=n.RGBA_S3TC_DXT3_Format,i=e.width*e.height;break;default:throw new Error(`Format ${e.format.join(", ")} not supported.`)}const s=new n.CompressedTexture([{data:new Uint8Array(e.data,0,i),width:e.width,height:e.height}],e.width,e.height,t);return s.minFilter=n.LinearFilter,s.wrapS=n.MirroredRepeatWrapping,s.wrapT=n.MirroredRepeatWrapping,s.needsUpdate=!0,s}},kwt4:function(e,t,i){"use strict";var n=i("9Ykw"),s=i("rwco");const r=s.c.get("core/data_formats/parsing/ninja/njcm");var o;function a(e,t){const i=e.u32(),n=e.u32(),s=e.vec3_f32(),r=e.f32(),a=[],u=[];if(i){e.seek_start(i);for(const i of c(e,t,!0))if(i.type===o.Vertex)for(const e of i.vertices)a[e.index]={position:e.position,normal:e.normal,bone_weight:e.bone_weight,bone_weight_status:e.bone_weight_status,calc_continue:e.calc_continue}}if(n){e.seek_start(n);let i=void 0;for(const n of c(e,t,!1))if(n.type===o.Tiny)i=n.texture_id;else if(n.type===o.Strip){for(const e of n.triangle_strips)e.texture_id=i;u.push(...n.triangle_strips)}}return{type:"njcm",vertices:a,meshes:u,collision_sphere_center:s,collision_sphere_radius:r}}function c(e,t,i){const n=[];let s=!0;for(;s;){const a=e.u8(),h=e.u8(),d=e.position;let _=0;if(0===a)n.push({type:o.Null,type_id:a});else if(1<=a&&a<=3)n.push({type:o.Bits,type_id:a});else if(4===a){const i=h,r=e.position;n.push({type:o.CachePolygonList,type_id:a,cache_index:i,offset:r}),t[i]=r,s=!1}else if(5===a){const s=h,r=t[s];null!=r&&(e.seek_start(r),n.push(...c(e,t,i))),n.push({type:o.DrawPolygonList,type_id:a,cache_index:s})}else if(8<=a&&a<=9){_=2;const t=e.u16();n.push({type:o.Tiny,type_id:a,flip_u:0!=(128&a),flip_v:0!=(64&a),clamp_u:0!=(32&a),clamp_v:0!=(16&a),mipmap_d_adjust:15&a,filter_mode:t>>>14,super_sample:0!=(64&t),texture_id:8191&t})}else 17<=a&&a<=31?(_=2+2*e.u16(),n.push({type:o.Material,type_id:a})):32<=a&&a<=50?(_=2+4*e.u16(),n.push({type:o.Vertex,type_id:a,vertices:u(e,a,h)})):56<=a&&a<=58?(_=2+2*e.u16(),n.push({type:o.Volume,type_id:a})):64<=a&&a<=75?(_=2+2*e.u16(),n.push({type:o.Strip,type_id:a,triangle_strips:l(e,a,h)})):255===a?(_=i?2:0,n.push({type:o.End,type_id:a}),s=!1):(_=2+2*e.u16(),n.push({type:o.Unknown,type_id:a}),r.warn(`Unknown chunk type ${a} at offset ${d}.`));e.seek_start(d+_)}return n}function u(e,t,i){if(t<32||t>50)return r.warn(`Unknown vertex chunk type ${t}.`),[];const n=3&i,s=0!=(128&i),o=e.u16(),a=e.u16(),c=[];for(let i=0;i<a;++i){const r={index:o+i,position:e.vec3_f32(),bone_weight:1,bone_weight_status:n,calc_continue:s};if(32===t)e.seek(4);else if(33===t)e.seek(4),r.normal=e.vec3_f32(),e.seek(4);else if(35<=t&&t<=40)37===t?(r.index=o+e.u16(),r.bone_weight=e.u16()/255):e.seek(4);else if(41<=t&&t<=47)r.normal=e.vec3_f32(),t>=42&&(44===t?(r.index=o+e.u16(),r.bone_weight=e.u16()/255):e.seek(4));else if(48<=t&&t<=50){const i=e.u32();r.normal={x:(i>>20&1023)/1023,y:(i>>10&1023)/1023,z:(1023&i)/1023},t>=49&&e.seek(4)}c.push(r)}return c}function l(e,t,i){const n={ignore_light:0!=(1&i),ignore_specular:0!=(2&i),ignore_ambient:0!=(4&i),use_alpha:0!=(8&i),double_side:0!=(16&i),flat_shading:0!=(32&i),environment_mapping:0!=(64&i)},s=e.u16(),r=s>>>14,o=16383&s;let a=!1,c=!1,u=!1,l=!1;switch(t){case 64:break;case 65:case 66:a=!0;break;case 67:u=!0;break;case 68:case 69:a=!0,u=!0;break;case 70:c=!0;break;case 71:case 72:a=!0,c=!0;break;case 73:break;case 74:case 75:l=!0;break;default:throw new Error(`Unexpected chunk type ID: ${t}.`)}const h=[];for(let t=0;t<o;++t){const t=e.i16(),i=t<1,s=Math.abs(t),o=[];for(let t=0;t<s;++t){const i={index:e.u16()};o.push(i),a&&(i.tex_coords={x:e.u16()/255,y:e.u16()/255}),c&&e.seek(4),u&&(i.normal={x:e.u16()/255,y:e.u16()/255,z:e.u16()/255}),l&&e.seek(8),t>=2&&e.seek(2*r)}h.push(Object.assign(Object.assign({},n),{clockwise_winding:i,has_tex_coords:a,has_normal:u,vertices:o}))}return h}!function(e){e[e.Unknown=0]="Unknown",e[e.Null=1]="Null",e[e.Bits=2]="Bits",e[e.CachePolygonList=3]="CachePolygonList",e[e.DrawPolygonList=4]="DrawPolygonList",e[e.Tiny=5]="Tiny",e[e.Material=6]="Material",e[e.Vertex=7]="Vertex",e[e.Volume=8]="Volume",e[e.Strip=9]="Strip",e[e.End=10]="End"}(o||(o={}));const h=s.c.get("core/data_formats/parsing/ninja/xj");function d(e){e.seek(4);const t=e.u32(),i=e.u32(),n=e.u32(),s=e.u32(),r=e.u32(),o=e.u32(),a={type:"xj",vertices:[],meshes:[],collision_sphere_position:e.vec3_f32(),collision_sphere_radius:e.f32()};return i>=1&&(i>1&&h.warn(`Vertex info count of ${i} was larger than expected.`),a.vertices.push(...function(e,t){e.seek_start(t);const i=e.u16();e.seek(2);const n=e.u32(),s=e.u32(),r=e.u32(),o=[];for(let t=0;t<r;++t){e.seek_start(n+t*s);const r=e.vec3_f32();let a,c;switch(i){case 3:a=e.vec3_f32(),c=e.vec2_f32();break;case 4:break;case 5:e.seek(4),c=e.vec2_f32();break;case 6:a=e.vec3_f32();break;case 7:a=e.vec3_f32(),c=e.vec2_f32();break;default:h.warn(`Unknown vertex type ${i} with size ${s}.`)}o.push({position:r,normal:a,uv:c})}return o}(e,t))),a.meshes.push(..._(e,n,s)),a.meshes.push(..._(e,r,o)),a}function _(e,t,i){const n=[];for(let s=0;s<i;++s){e.seek_start(t+20*s);const i=e.u32(),r=e.u32(),o=e.u32(),a=e.u32(),c=p(e,i,r);e.seek_start(o);const u=e.u16_array(a);n.push({material_properties:c,indices:u})}return n}function p(e,t,i){const n={};for(let s=0;s<i;++s){switch(e.seek_start(t+16*s),e.u32()){case 2:n.alpha_src=e.u32(),n.alpha_dst=e.u32();break;case 3:n.texture_id=e.u32();break;case 5:n.diffuse_r=e.u8(),n.diffuse_g=e.u8(),n.diffuse_b=e.u8(),n.diffuse_a=e.u8()}}return n}i.d(t,"a",(function(){return f})),i.d(t,"b",(function(){return m})),i.d(t,"c",(function(){return w})),i.d(t,"d",(function(){return v})),i.d(t,"e",(function(){return x}));const f=2*Math.PI/65535,b=1296255566;function m(e){return"njcm"===e.type}class g{constructor(e,t,i,n,s,r){this.bone_cache=new Map,this._bone_count=-1,this.evaluation_flags=e,this.model=t,this.position=i,this.rotation=n,this.scale=s,this.children=r}bone_count(){if(-1===this._bone_count){const e=[0];this.get_bone_internal(this,1/0,e),this._bone_count=e[0]}return this._bone_count}get_bone(e){let t=this.bone_cache.get(e);return void 0===t&&(t=this.get_bone_internal(this,e,[0]),this.bone_cache.set(e,t||null)),t||void 0}get_bone_internal(e,t,i){if(!e.evaluation_flags.skip){const n=i[0]++;if(this.bone_cache.set(n,e),n===t)return e}if(!e.evaluation_flags.break_child_trace)for(const n of e.children){const e=this.get_bone_internal(n,t,i);if(e)return e}}}function w(e){return y(e,a,[])}function v(e){return y(e,d,void 0)}function x(e){return k(e,d,void 0)}function y(e,t,i){const s=Object(n.a)(e).filter(e=>e.type===b),r=[];for(const e of s)r.push(...k(e.data,t,i));return r}function k(e,t,i){const n=e.u32(),s=0!=(1&n),r=0!=(2&n),o=0!=(4&n),a=0!=(8&n),c=0!=(16&n),u=0!=(32&n),l=0!=(64&n),h=0!=(128&n),d=e.u32(),_=e.vec3_f32(),p={x:e.i32()*f,y:e.i32()*f,z:e.i32()*f},b=e.vec3_f32(),m=e.u32(),w=e.u32();let v,x,y;return d&&(e.seek_start(d),v=t(e,i)),m?(e.seek_start(m),x=k(e,t,i)):x=[],w?(e.seek_start(w),y=k(e,t,i)):y=[],[new g({no_translate:s,no_rotate:r,no_scale:o,hidden:a,break_child_trace:c,zxy_rotation_order:u,skip:l,shape_skip:h},v,_,p,b,x),...y]}},oyid:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var n=i("sDu+"),s=i("4VsB"),r=i("FXpb");class o extends n.a{constructor(e=!1,t){super(t),this.element=Object(r.m)({className:"core_CheckBox"}),this.preferred_label_position="right",this._checked=new s.a(this,e,this.set_checked),this.checked=this._checked,this.set_checked(e),this.element.type="checkbox",this.element.onchange=()=>this._checked.set_val(this.element.checked,{silent:!1}),this.finalize_construction()}set_enabled(e){super.set_enabled(e),this.element.disabled=!e}set_checked(e){this.element.checked=e}}},tRdk:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i("Womt");function s(e){return new n.Vector3(e.x,e.y,e.z)}},vM2b:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i("Womt");class s{constructor(){this.positions=[],this.normals=[],this.uvs=[],this.indices=[],this.bones=[],this.bone_indices=[],this.bone_weights=[],this.groups=[],this.material_indices=new Set([-1])}get vertex_count(){return this.positions.length/3}get index_count(){return this.indices.length}get_position(e){return new n.Vector3(this.positions[3*e],this.positions[3*e+1],this.positions[3*e+2])}get_normal(e){return new n.Vector3(this.normals[3*e],this.normals[3*e+1],this.normals[3*e+2])}add_vertex(e,t,i){this.positions.push(e.x,e.y,e.z),this.normals.push(t.x,t.y,t.z),this.uvs.push(i.x,i.y)}add_index(e){this.indices.push(e)}add_bone(e){this.bones.push(e)}add_bone_weight(e,t){this.bone_indices.push(e),this.bone_weights.push(t)}add_group(e,t,i){const n=this.groups[this.groups.length-1],s=null==i?-1:i;n&&n.material_index===s?n.size+=t:(this.groups.push({offset:e,size:t,material_index:s}),this.material_indices.add(s))}build(){const e=new n.BufferGeometry,t=e.userData;t.created_by_geometry_builder=!0,e.setAttribute("position",new n.Float32BufferAttribute(this.positions,3)),e.setAttribute("normal",new n.Float32BufferAttribute(this.normals,3)),e.setAttribute("uv",new n.Float32BufferAttribute(this.uvs,2)),e.setIndex(new n.Uint16BufferAttribute(this.indices,1)),this.bone_indices.length&&this.bones.length?(e.setAttribute("skinIndex",new n.Uint16BufferAttribute(this.bone_indices,4)),e.setAttribute("skinWeight",new n.Float32BufferAttribute(this.bone_weights,4)),t.bones=this.bones):t.bones=[];const i=new Map;let s=0;for(const e of[...this.material_indices].sort((e,t)=>e-t))i.set(e,s++);for(const t of this.groups)e.addGroup(t.offset,t.size,i.get(t.material_index));return t.normalized_material_indices=i,e.computeBoundingSphere(),e.computeBoundingBox(),e}}},w6HN:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var n=i("TRid"),s=(i("IQIM"),i("sDu+")),r=i("FXpb");class o extends n.a{constructor(e,...t){super(e instanceof n.a?void 0:e),this.element=Object(r.i)({className:"core_ToolBar"}),this.height=33,this.element.style.height=`${this.height}px`,this.children=e instanceof n.a?[e,...t]:t;for(const e of this.children)if(this.disposable(e),e instanceof s.a&&e.label){const t=Object(r.i)({className:"core_ToolBar_group"});"left"===e.preferred_label_position||"top"===e.preferred_label_position?t.append(e.label.element,e.element):t.append(e.element,e.label.element),this.element.append(t)}else this.element.append(e.element);this.finalize_construction()}set_enabled(e){super.set_enabled(e);for(const t of this.children)t.enabled.val=e}}}}]);